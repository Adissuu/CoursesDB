import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth, updateUser } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';
import { API } from '../../config';


const ProfileUpdate = () => {
    const [values, setValues] = useState({
        username: '',
        name: '',
        email: '',
        about: '',
        password: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        userData: ''
    })

    const token = getCookie('token');
    const { username, name, email, about, password, error, success, loading, photo, userData } = values

    const init = () => {
        if (token) {
            getProfile(token).then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        username: data.username,
                        name: data.name,
                        email: data.email,
                        about: data.about
                    });
                }
            });
        }
    };

    useEffect(() => {
        init()
    }, []);

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        let userFormData = new FormData();
        userFormData.set(name, value);
        setValues({ ...values, [name]: value, userData: userFormData, error: false, success: false });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true });
        console.log(userData.values)
        update(token, userData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false, loading: false });
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        username: data.username,
                        name: data.name,
                        email: data.email,
                        about: data.about,
                        password: '',
                        success: true,
                        loading: false
                    });
                });
            }
        });
    };

    const showLoading = () => (loading ? (<div className="bg-forest-300 border-t border-b border-100 text-forest-200 px-4 py-3 mx-16 mt-2 rounded">
        <p className="font-bold">Loading...</p>
        <p className="text-sm">Please wait</p>
    </div>) : '');

    const showError = () => (
        <div className="bg-red-100 border-t border-b border-100 text-red-800 px-4 py-3 rounded m-2" style={{ display: error ? '' : 'none' }}>
            Error
        </div>
    );

    const showSuccess = () => (
        <div className="bg-forest-300 border-t border-b border-100 text-forest-200 px-4 py-3 mx-16 mt-2 rounded" style={{ display: success ? '' : 'none' }}>
            Succeeded
        </div>
    );

    const profileUpdateForm = () => (
        <form onSubmit={handleSubmit} className="mx-4">
            <label className="block mb-2 text-lg font-medium text-white" >Upload file</label>
            <input onChange={handleChange('photo')} className="block w-full text-lg border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-azur-100 border-forest-100 placeholder-gray-400" type="file" />
            <div className="mb-2">
                <label className="block mb-2 text-lg text-white">Username</label>
                <input onChange={handleChange('username')} value={username} type="name" className=" border text-lg rounded-lg block w-full p-2.5 bg-azur-100 border-forest-100 text-white focus:outline-none" />
            </div>
            <div className="mb-2">
                <label className="block mb-2 text-lg text-white">Name</label>
                <input onChange={handleChange('name')} value={name} type="name" className=" border text-lg rounded-lg block w-full p-2.5 bg-azur-100 border-forest-100 text-white focus:outline-none" />
            </div>
            <div className="mb-2">
                <label className="block mb-2 text-lg text-white">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className=" border text-lg rounded-lg block w-full p-2.5 bg-azur-100 border-forest-100 text-white focus:outline-none" />
            </div>
            <div className="mb-2">
                <label className="block mb-2 text-lg text-white">About</label>
                <input onChange={handleChange('about')} value={about} type="text" className=" border text-lg rounded-lg block w-full p-2.5 bg-azur-100 border-forest-100 text-white focus:outline-none" />
            </div>
            <div className="mb-2">
                <label className="block mb-2 text-lg text-white">Password</label>
                <input onChange={handleChange('password')} value={password} type="text" className=" border text-lg rounded-lg block w-full p-2.5 bg-azur-100 border-forest-100 text-white focus:outline-none" />
            </div>
            <div>
                <button type="submit" className="my-2 text-white bg-forest-100 hover:bg-forest-200 focus:outline-none font-medium rounded-lg text-lg px-5 py-2.5 text-center">
                    Update Profile
                </button>
            </div>
        </form>
    );

    return (
        <>
            <div className="">
                <div className="flex justify-center">
                    <img
                        src={`${API}/user/photo/${username}`}
                        className="shadow-xl drop-shadow-2xl mt-4"
                        style={{
                            width: '300px', height: '300px', objectFit: 'cover', borderRadius: '50% ', border: '3px solid #1BD175'
                        }}
                        alt="user profile"
                    />
                </div>
                <div className="">

                    {showSuccess()}
                    {showError()}
                    {showLoading()}
                    {profileUpdateForm()}
                </div>
            </div>

        </>
    )

}

export default ProfileUpdate;