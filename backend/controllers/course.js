const Course = require('../models/course');
const Category = require('../models/category');
const Tag = require('../models/tag');
const formidable = require('formidable');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');
const fs = require('fs');
const { smartTrim } = require('../helpers/course');


exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {

        if (err) {
            return res.status(400).json({
                error: 'Image could not upload'
            });
        }
        const { title, body, categories, tags } = fields

        if (!title || !title.length) {
            return res.status(400).json({
                error: 'title is required'
            });
        }

        if (!categories || categories.length === 0) {
            return res.status(400).json({
                error: 'At least one category is required'
            });
        }

        if (!tags || tags.length === 0) {
            return res.status(400).json({
                error: 'At least one tag is required'
            });
        }


        let course = new Course();
        course.title = title;
        course.body = body;
        // console.log(req.auth)
        course.excerpt = smartTrim(course.body, 180, ' ', ' ...');
        course.slug = slugify(title).toLowerCase();
        course.mtitle = `${title} | ${process.env.APP_NAME}`;
        course.mdesc = course.body.substring(3, 160);
        course.postedBy = req.auth._id;
        // categories and tags
        let arrayOfCategories = categories && categories.split(',');
        let arrayOfTags = tags && tags.split(',');

        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less then 1mb in size'
                });
            }
            course.photo.data = fs.readFileSync(files.photo.path);
            course.photo.contentType = files.photo.type;
        }
        course.save((err, result) => {
            if (err) {
                // console.log("error incoming", err)
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            // res.json(result);
            Course.findByIdAndUpdate(result._id, { $push: { categories: arrayOfCategories, tags: arrayOfTags } }, { new: true }).exec(
                (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    } else {
                        return res.json(result);
                    }
                }
            );
        });
    });
};


exports.list = (req, res) => {
    Course.find({})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                })
            }
            res.json(data);
        })
}
exports.listAllCoursesCategoriesTags = (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    let courses;
    let categories;
    let tags;

    Course.find({})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username profile')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            courses = data; // courses
            // get all categories
            Category.find({}).exec((err, c) => {
                if (err) {
                    return res.json({
                        error: errorHandler(err)
                    });
                }
                categories = c; // categories
                // get all tags
                Tag.find({}).exec((err, t) => {
                    if (err) {
                        return res.json({
                            error: errorHandler(err)
                        });
                    }
                    tags = t;

                    res.json({ courses, categories, tags, size: courses.length });
                });
            });
        });
};

exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    Course.findOne({ slug })
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title body slug mtitle mdesc categories tags postedBy createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
};
exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    Course.findOneAndRemove({ slug }).exec((err, data) => {
        if (err) {
            return res.json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Course deleted successfully.'
        });
    });
};

exports.update = (req, res) => {
    const slug = req.params.slug.toLowerCase();

    Course.findOne({ slug }).exec((err, oldCourse) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        let form = new formidable.IncomingForm();
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not upload'
                });
            }

            let slugBeforeMerge = oldCourse.slug;
            oldCourse = _.merge(oldCourse, fields);
            oldCourse.slug = slugBeforeMerge;

            const { body, desc, categories, tags } = fields;

            if (body) {
                oldCourse.excerpt = smartTrim(body, 320, ' ', ' ...');
                oldCourse.desc = body.substring(3, 160);
            }

            if (categories) {
                oldCourse.categories = categories.split(',');
            }

            if (tags) {
                oldCourse.tags = tags.split(',');
            }

            if (files.photo) {
                if (files.photo.size > 10000000) {
                    return res.status(400).json({
                        error: 'Image should be less then 1mb in size'
                    });
                }
                oldCourse.photo.data = fs.readFileSync(files.photo.path);
                oldCourse.photo.contentType = files.photo.type;
            }

            oldCourse.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                // result.photo = undefined;
                res.json(result);
            });
        });
    });
};