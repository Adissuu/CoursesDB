import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';

const SignupComponent = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })

    const { email, password, error, loading, message, showForm } = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false })
        const user = { email, password }
        signin(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                // save user token to cookie
                // save user info to localstorage
                // authenticate user
                authenticate(data, () => {
                    if (isAuth() && isAuth().role == 1) {
                        Router.push(`/admin`);
                    } else {
                        Router.push(`/user`);
                    }
                });
            }
        });
    };

    const handleChange = name => (e) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const showLoading = () => (loading ? (<div className="absolute top-1/4 bg-forest-300 border-t border-b border-100 text-forest-200 px-4 py-3 rounded" role="alert">
        <p class="font-bold">Loading...</p>
        <p class="text-sm">Please wait</p>
    </div>) : '');
    const showError = () => (error ? (<div className="absolute top-1/4 bg-red-100 border-t border-b border-100 text-red-800 px-4 py-3 rounded m-2" role="alert">
        <p className="font-bold">Error!</p>
        <p className="text-sm">{error}</p>
    </div>) : '');
    const showMessage = () => (message ? (<div className="absolute top-1/4 bg-forest-300 border-t border-b border-100 text-forest-200 px-4 py-3 rounded" role="alert">
        <p className="font-bold">Success!</p>
        <p className="text-sm">{message}</p>
    </div>) : '');


    const signinForm = () => {
        return (
            <div className="backdrop-blur-md border-2 p-5 rounded-md w-full acc">
                <h1 className='flex justify-center text-white text-3xl underline my-3'>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group relative z-0 mb-12 w-full group">
                        <input value={email}
                            type="email"
                            onChange={handleChange('email')}
                            className="form-control block py-4 px-0 w-full text-3xl text-white bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:focus:border-forest-100 focus:outline-none focus:ring-0 focus:border-forest-100 peer" />
                        <label className="peer-focus:font-medium absolute text-3xl text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-forest-100 peer-focus:dark:text-forest-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    </div>
                    <div className="form-group relative z-0 mb-12 w-full group">
                        <input value={password}
                            type="Password"
                            onChange={handleChange('password')}
                            className="block py-4 px-0 w-full text-3xl text-white bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-white dark:focus:border-forest-100 focus:outline-none focus:ring-0 focus:border-forest-100 peer" />
                        <label className="peer-focus:font-medium absolute text-3xl text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-forest-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>

                    <div className='flex justify-center'>
                        <button className="btn bg-forest-100 p-2 content-center text-3xl rounded-md text-white hover:bg-forest-200 duration-300">Sign In</button>
                    </div>
                </form>
                <br />
                <Link className='text-forest-100 hover:text-forest-200' href="/auth/password/forgot">Forgot Password?</Link>
            </div>

        );
    }

    return (
        <>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}

        </>
    )
};

export default SignupComponent;