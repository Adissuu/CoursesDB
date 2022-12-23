import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const createCourse = (course, token) => {
    // console.log(course.get('title'));
    return fetch(`${API}/course`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: course
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listCoursesWithCatAndTags = (course, token) => {
    // console.log(course.get('title'));
    return fetch(`${API}/courses-categories-tags`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
