import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const createCourse = (course, token) => {
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
