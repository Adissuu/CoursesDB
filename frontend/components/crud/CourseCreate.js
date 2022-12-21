import Link from "next/link";
import { useState, useEffect } from "react";
import { Router, withRouter } from "next/router";
import dynamic from 'next/dynamic';
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createCourse } from "../../actions/course";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import '../../node_modules/react-quill/dist/quill.snow.css'



const CreateCourse = ({ router }) => {

    const courseFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('course')) {
            return JSON.parse(localStorage.getItem('course'));
        } else {
            return false;
        }
    }

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags

    const [body, setBody] = useState(courseFromLS());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false
    })

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initCategories();
        initTags();
    }, [router]);

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

    const { error, sizeError, success, formData, title, hidePublishButton } = values

    const publishCourse = (e) => {
        e.preventDefault()
        console.log('ready')
    }

    const handleChange = name => e => {
        console.log(e.target.value);
        const value = e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const handleBody = e => {
        // console.log(e);
        setBody(e);
        formData.set('body', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('course', JSON.stringify(e));
        }
    };

    const handleToggle = c => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }
        console.log(all);
        setChecked(all);
        formData.set('categories', all);
    };

    const handleTagsToggle = t => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedTag = checked.indexOf(t);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            all.push(t);
        } else {
            all.splice(clickedTag, 1);
        }
        console.log(all);
        setCheckedTag(all);
        formData.set('tags', all);
    };

    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (
                <li key={i} className="list-none">
                    <label className="relative cursor-pointer">
                        <input onChange={handleToggle(c._id)} type="checkbox" className="peer sr-only" />
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
                        <input onChange={handleToggle(t._id)} type="checkbox" className="peer sr-only" />
                        <h2 className="border-2 border-solid border-forest-100 text-forest-100 rounded-md w-auto p-1 my-2 text-xl inline-block peer-checked:bg-forest-100 peer-checked:text-azur-100">
                            {t.name}
                        </h2>
                    </label>
                </li >
            ))
        );
    };

    const createCourseForm = () => {
        return (
            <form onSubmit={publishCourse}>
                <div className="mb-2">
                    <label className="mx-2 text-2xl text-forest-100">Course:</label>
                    <input type="text" className="bg-azur-100 border-2 text-2xl text-white w-11/12 rounded-lg px-1 mx-2
                    border-azur-100 focus:border-forest-100 focus:outline-0" placeholder="Title" value={title} onChange={handleChange('title')} />
                </div>
                <div className="">
                    <ReactQuill
                        className="text-white mx-2"
                        modules={CreateCourse.modules} formats={CreateCourse.formats} value={body} onChange={handleBody} />
                </div>
                <div className="text-center text-2xl mt-4">
                    <button type="submit" className="border-2 text-3xl rounded-lg border-forest-100 border-solid w-64 mb-4 text-center text-forest-100 hover:text-azur-100 hover:bg-forest-100">Publish</button>
                </div>
            </form>
        );
    }


    return (
        <div className="flex flex-none justify-between">
            <div className="w-full">
                {createCourseForm()}
            </div>
            <div className="flex flex-col mx-4 w-2/12">
                <h1 className="text-forest-100 text-2xl">Fields</h1>
                <hr />
                <ul className="scrollbar-hide" style={{ maxHeight: '400px', overflowY: 'scroll' }}>{showCategories()}</ul>
                <h1 className="text-forest-100 text-2xl">Prerequesites</h1>
                <hr />
                <ul className="scrollbar-hide" style={{ maxHeight: '400px', overflowY: 'scroll' }}>{showTags()}</ul>
            </div>
        </div>
    );
};

CreateCourse.modules = {
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

CreateCourse.formats = [
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

export default withRouter(CreateCourse);