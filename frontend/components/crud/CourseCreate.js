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

    const { error, sizeError, success, formData, title, hidePublishButton } = values

    const publishCourse = (e) => {
        e.preventDefault()
        console.log('ready')
    }

    const handleChange = name => event => {
        console.log(event.target.value)
    }

    const handleBody = event => {
        console.log(event);
    }

    const createCourseForm = () => {
        return (
            <form onSubmit={publishCourse}>
                <div className="">
                    <label>Title</label>
                    <input type="text" value={title} placeholder="title" onChange={handleChange('title')} />
                </div>
                <div className="">
                    <ReactQuill value={body} placeholder='Course goes here' onChange={handleBody} />
                </div>
                <div className="">
                    <button type="submit">Publish</button>
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