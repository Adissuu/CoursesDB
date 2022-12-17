import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/auth';
import { create, getTags, removeTag } from '../../actions/tag';

const Tag = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        tags: [],
        removed: false,
        reload: false
    });

    const { name, error, success, tags, removed, reload } = values;
    const token = getCookie('token');

    useEffect(() => {
        loadTags();
    }, [reload]);

    const loadTags = () => {
        getTags().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, tags: data });
            }
        });
    };

    const showTags = () => {
        return tags.map((c, i) => {
            return (
                <button
                    onDoubleClick={() => deleteConfirm(c.slug)}
                    title="Double click to delete"
                    key={i}
                    className="text-white border-2 border-forest-100 rounded-lg p-1 hover:bg-forest-100 hover:text-azur-100 mr-1 ml-1 mt-3"
                >
                    {c.name}
                </button>
            );
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this tag?');
        if (answer) {
            deleteTag(slug);
        }
    };

    const deleteTag = slug => {
        // console.log('delete', slug);
        removeTag(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload });
            }
        });
    };

    const clickSubmit = e => {
        e.preventDefault();
        // console.log('create tag', name);
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
            return <p className="text-white">Tag is created</p>;
        }
    };

    const showError = () => {
        if (error) {
            return <p className="text-white">Tag already exists</p>;
        }
    };

    const showRemoved = () => {
        if (removed) {
            return <p className="text-white">Tag is removed</p>;
        }
    };

    const mouseMoveHandler = e => {
        setValues({ ...values, error: false, success: false, removed: '' });
    };

    const newTagForm = () => (
        <>
            <h1 className='text-center text-white text-xl mb-4'>Tags</h1>
            <form onSubmit={clickSubmit} className='text-forest-100'>
                <div className='flex justify-center'>
                    <label className="bg-azur-100 mr-1 border-2 border-azur-100">Name:</label>
                    <input type="text" className="bg-azur-100 border-2 rounded-lg px-1
                    border-azur-100 focus:border-forest-100 focus:outline-0" placeholder='Tag' onChange={handleChange} value={name} required />
                </div>
                <div>
                    <div className="flex justify-center">
                        <button type="submit" className="text-center hover:text-forest-200">
                            Create
                        </button>
                    </div>
                </div>
            </form>
        </>
    );

    return (
        <>
            <div className="p-4 bg-azur-100 mx-10 rounded-lg">
                {showSuccess()}
                {showError()}
                {showRemoved()}
                <div onMouseMove={mouseMoveHandler}>
                    {newTagForm()}
                    {showTags()}
                </div>
            </div>
        </>
    );
};

export default Tag;