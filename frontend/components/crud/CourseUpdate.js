import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { withRouter } from "next/router";
import dynamic from 'next/dynamic';
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { singleCourse, updateCourse } from "../../actions/course";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import '../../node_modules/react-quill/dist/quill.snow.css'



const CourseUpdate = ({ router }) => {

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags

    const [body, setBody] = useState('');
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        title: '',
        body: ''
    });

    const { error, success, title } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values });
        initCourse();
        initCategories();
        initTags();
    }, [router]);

    const initCourse = () => {
        if (router.query.slug) {
            singleCourse(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, title: data.title });
                    setBody(data.body);
                    setCategoriesArray(data.categories);
                    setTagsArray(data.tags);
                }
            });
        }
    };

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    const initTags = () => {
        getTags().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setTags(data);
            }
        });
    };

    const setCategoriesArray = courseCategories => {
        let ca = [];
        courseCategories.map((c, i) => {
            ca.push(c._id);
        });
        setChecked(ca);
    };

    const setTagsArray = courseTags => {
        let ta = [];
        courseTags.map((t, i) => {
            ta.push(t._id);
        });
        setCheckedTag(ta);
    };

    const editCourse = (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append("title", values.title);
        formData.append("body", body);
        console.log(formData.get('body'))

        updateCourse(formData, token, router.query.slug).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
                console.log('abt')
            } else {
                setValues({ ...values, title: '', error: '', success: `The course titled "${data.title}" has been updated.` });
                console.log('je me rends ici')
                Router.replace(`/admin`);
            }
        });
    };

    const handleChange = name => e => {
        //console.log(e.target.value);
        const value = e.target.value;
        setValues({ ...values, [name]: value, error: '' });
    };

    const handleBody = e => {
        // console.log(e);
        setBody(e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('course', JSON.stringify(e));
        }
    };

    const handleToggle = c => () => {
        setValues({ ...values, error: '' });
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }
        setChecked(all);
    };

    const handleTagsToggle = t => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedTag = checkedTag.indexOf(t);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            all.push(t);
        } else {
            all.splice(clickedTag, 1);
        }
        setCheckedTag(all);
    };

    const findOutCategory = c => {
        const result = checked.indexOf(c);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const findOutTag = t => {
        const result = checkedTag.indexOf(t);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (
                <li key={i} className="list-none">
                    <label className="relative cursor-pointer">
                        <input
                            onChange={handleToggle(c._id)}
                            checked={findOutCategory(c._id)}
                            type="checkbox" className="peer sr-only" />
                        <h2 className="border-2 border-solid border-forest-100 text-forest-100 rounded-md w-auto p-1 my-2 text-xl inline-block peer-checked:bg-forest-100 peer-checked:text-azur-100">
                            {c.name}
                        </h2>
                    </label>
                </li>
            ))
        );
    };
    const showTags = () => {
        return (
            tags &&
            tags.map((t, i) => (
                <li key={i} className="list-none">
                    <label className="relative cursor-pointer">
                        <input
                            onChange={handleTagsToggle(t._id)}
                            checked={findOutTag(t._id)}
                            type="checkbox"
                            className="peer sr-only" />
                        <h2 className="border-2 border-solid border-forest-100 text-forest-100 rounded-md w-auto p-1 my-2 text-xl inline-block peer-checked:bg-forest-100 peer-checked:text-azur-100">
                            {t.name}
                        </h2>
                    </label>
                </li >
            ))
        );
    };

    const showError = () => (
        <div className="bg-red-100 border-t border-b border-100 text-red-800 px-4 py-3 rounded m-2" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="bg-forest-300 border-t border-b border-100 text-forest-200 px-4 py-3 mx-16 rounded" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );

    const updateCourseForm = () => {
        return (
            <form onSubmit={editCourse}>
                <div className="mb-2">
                    <label className="mx-2 text-2xl text-forest-100">Course:</label>
                    <input type="text" className="bg-azur-100 border-2 text-2xl text-white w-11/12 rounded-lg px-1 mx-2
                    border-azur-100 focus:border-forest-100 focus:outline-0" placeholder="Title" value={title} onChange={handleChange('title')} />
                </div>
                <div className="">
                    <ReactQuill
                        className="text-white mx-2"
                        modules={CourseUpdate.modules} formats={CourseUpdate.formats} value={body} onChange={handleBody} />
                </div>
                <div className="text-center text-2xl mt-4">
                    <button type="submit" className="border-2 text-3xl rounded-lg border-forest-100 border-solid w-64 mb-4 text-center text-forest-100 hover:text-azur-100 hover:bg-forest-100">Update!</button>
                </div>
            </form>
        );
    }


    return (
        <><div className="">

        </div>
            <div className="flex flex-none justify-between">
                <div className="w-full">
                    {showError()}
                    {showSuccess()}
                    {updateCourseForm()}
                </div>
                <div className="flex flex-col mx-4 w-2/12">
                    <h1 className="text-forest-100 text-2xl">Fields</h1>
                    <hr />
                    <ul className="scrollbar-hide" style={{ maxHeight: '400px', overflowY: 'scroll' }}>{showCategories()}</ul>
                    <h1 className="text-forest-100 text-2xl">Prerequesites</h1>
                    <hr />
                    <ul className="scrollbar-hide" style={{ maxHeight: '400px', overflowY: 'scroll' }}>{showTags()}</ul>
                    <h1 className="text-forest-100 text-2xl">Formatting Information</h1>
                    <hr />
                    <div className="rounded-b-md bg-azur-100 text-white pl-1">
                        <ul>
                            <li>- Use H<sub>6</sub> for end of chapters.
                                DO NOT create space under
                            </li>
                            <li>
                                - Use p for main text
                            </li>
                            <li>
                                - Use H<sub>1</sub> for chapter name
                            </li>
                        </ul>
                    </div>
                </div>
            </div></>
    );
};

CourseUpdate.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['clean'],
        ['code-block']
    ]
};

CourseUpdate.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'code-block'
];

export default withRouter(CourseUpdate);