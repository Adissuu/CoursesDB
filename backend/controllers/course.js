const Course = require('../models/course');
const Category = require('../models/category');
const Tag = require('../models/tag');
const formidable = require('formidable');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const fs = require('fs');
// const stripHtml = await import('string-strip-html');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { smartTrim } = require('../helpers/course')


exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not upload'
            })
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
            tags = "no-tag";
        }


        let course = new Course()
        course.title = title
        course.body = body
        course.excerpt = smartTrim(body, 180, ' ', ' ...')
        course.slug = slugify(title).toLowerCase()
        course.mtitle = `${title} | ${process.env.APP_NAME}`
        course.mdesc = stripHtml(body.substring(0, 160))
        course.postedBy = req.user._id
        // categories and tags
        let arrayOfCategories = categories && categories.split(',');
        let arrayOfTags = tags && tags.split(',');

        blog.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            // res.json(result);
            Course.findById(result._id, { $push: { categories: arrayOfCategories } }, { new: true }).exec((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                } else {
                    Course.findById(result._id, { $push: { tags: arrayOfTags } }, { new: true }).exec((err, result) => {
                        if (err) {
                            return res.status(400).json({
                                error: errorHandler(err)
                            })
                        } else {
                            res.json(result)
                        }
                    })
                }
            })

        })
    });
};