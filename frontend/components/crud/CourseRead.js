import Link from "next/link";
import { useState, useEffect } from "react";
import { Router } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeCourse } from "../../actions/course";
import moment from 'moment';

const CourseRead = () => {
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCourses(data);
            }
        });
    };

    const deleteCourse = slug => {
        removeCourse(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadCourses();
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Oi bud, ya sure ya wan delete dat course?');
        if (answer) {
            deleteCourse(slug);
        }
    };

    const showUpdateButton = course => {
        if (isAuth() && isAuth().role === 1) {
            return (
                <Link className="p-1 bg-violet-200 rounded-md hover:bg-violet-300" href={`/admin/crud/${course.slug}`}>
                    Modify
                </Link>
            );
        }
    };

    const showAllCourses = () => {
        return courses.map((course, i) => {
            return (
                <div key={i} className="mx-6 my-2 text-azur-100 bg-violet-500 px-4 py-2 rounded-xl hover:bg-violet-400">
                    <div className="flex">
                        <h3>{`${course.title} |`} </h3>
                        <p className="ml-2">
                            Written by {course.postedBy.name} {moment(course.updatedAt).fromNow()}
                        </p>
                    </div>

                    <button className="mr-2 rounded-md text-red-900 bg-red-200 px-1 hover:bg-red-300" onClick={() => deleteConfirm(course.slug)}>
                        Delete
                    </button>
                    {showUpdateButton(course)}
                </div>
            );
        });
    };

    return (
        <>
            <div className="">
                <div className="">
                    {message && <div className="text-center bg-violet-500 text-violet-100 rounded-md text-xl mx-5 mb-5">{message}</div>}
                    {showAllCourses()}
                </div>
            </div>
        </>
    );
};

export default CourseRead;