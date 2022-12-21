import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/auth';
import { create, getCategories, removeCategory } from '../../actions/category';

const Category = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: false
    });

    const { name, error, success, categories, removed, reload } = values;
    const token = getCookie('token');

    useEffect(() => {
        loadCategories();
    }, [reload]);

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, categories: data });
            }
        });
    };

    const showCategories = () => {
        return categories.map((c, i) => {
            return (
                <button
                    onDoubleClick={() => deleteConfirm(c.slug)}
                    title="Double click to delete"
                    key={i}
                    className="text-xl text-white border-2 border-forest-100 rounded-lg p-2 hover:bg-forest-100 hover:text-azur-100 mr-1 ml-1 mt-3"
                >
                    {c.name}
                </button>
            );
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this category?');
        if (answer) {
            deleteCategory(slug);
        }
    };

    const deleteCategory = slug => {
        // console.log('delete', slug);
        removeCategory(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload });
            }
        });
    };

    const clickSubmit = e => {
        e.preventDefault();
        // console.log('create category', name);
        create({ name }, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, error: false, success: true, name: '', reload: !reload });
            }
        });
    };

    const handleChange = e => {
        setValues({ ...values, name: e.target.value, error: false, success: false, removed: '' });
    };

    const showSuccess = () => {
        if (success) {
            return <p className="absolute text-white">Category is created</p>;
        }
    };

    const showError = () => {
        if (error) {
            return <p className="text-white">Category already exist</p>;
        }
    };

    const showRemoved = () => {
        if (removed) {
            return <p className="text-white">Category is removed</p>;
        }
    };

    const mouseMoveHandler = e => {
        setValues({ ...values, error: false, success: false, removed: '' });
    };

    const newCategoryForm = () => (
        <>
            <h1 className='text-center text-white text-2xl mb-4'>Categories</h1>
            <form onSubmit={clickSubmit} className='text-forest-100'>
                <div className='flex justify-center'>
                    <label className="bg-azur-100 mr-1 border-2 border-azur-100 text-xl">Name:</label>
                    <input type="text" className="bg-azur-100 border-2 text-xl rounded-lg px-1
                    border-azur-100 focus:border-forest-100 focus:outline-0" placeholder='Category' onChange={handleChange} value={name} required />
                </div>
                <div>
                    <div className="flex justify-center">
                        <button type="submit" className="border-2 mt-4 border-forest-100 border-solid p-1 text-2xl content-center rounded-md text-white hover:bg-forest-100 hover:text-azur-100 duration-300 cursor-pointer">
                            Create
                        </button>
                    </div>
                </div>
            </form>
        </>
    );

    return (
        <>
            <div className="p-4 bg-azur-100 mb-4 mx-10 rounded-lg">
                {showSuccess()}
                {showError()}
                {showRemoved()}
                <div onMouseMove={mouseMoveHandler} className="mb-1">
                    {newCategoryForm()}
                    {showCategories()}
                </div>
            </div>
        </>
    );
};

export default Category;