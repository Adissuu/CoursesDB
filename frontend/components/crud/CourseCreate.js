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

    const [body, setBody] = useState({});
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
        //initCategories();
        //initTags();
    }, [router]);

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
            localStorage.setItem('blog', JSON.stringify(e));
        }
    };

    const createCourseForm = () => {
        return (
            <form onSubmit={publishCourse}>
                <div className="mb-2">
                    <label className="mx-2 text-lg text-forest-100">Course:</label>
                    <input type="text" className="bg-azur-100 border-2 text-white w-10/12 rounded-lg px-1
                    border-azur-100 focus:border-forest-100 focus:outline-0" placeholder="Title" value={title} onChange={handleChange('title')} />
                </div>
                <div className="">
                    <ReactQuill
                        className="text-white mx-2"
                        modules={CreateCourse.modules} formats={CreateCourse.formats} value={body} onChange={handleBody} />
                </div>
                <div className="text-center text-2xl mt-4">
                    <button type="submit" className="border-2 rounded-lg border-forest-100 border-solid w-64 mb-4 text-center text-forest-100 hover:text-azur-100 hover:bg-forest-100">Publish</button>
                </div>
            </form>
        );
    }


    return (
        <div className="">
            {createCourseForm()}
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