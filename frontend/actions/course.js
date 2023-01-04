import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string'
import { handleResponse } from './auth';


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
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listCoursesWithCatAndTags = () => {
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

export const singleCourse = (slug) => {
    return fetch(`${API}/course/${slug}`, {
        method: 'GET',
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));

}

export const list = () => {
    return fetch(`${API}/courses/`, {
        method: 'GET',
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));

}

export const removeCourse = (slug, token) => {
    // console.log(course.get('title'));
    return fetch(`${API}/course/${slug}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};


export const updateCourse = (course, token, slug) => {
    return fetch(`${API}/course/${slug}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: course
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listSearch = (params) => {
    let query = queryString.stringify(params);
    return fetch(`${API}/courses/search?${query}`, {
        method: 'GET',
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));

}