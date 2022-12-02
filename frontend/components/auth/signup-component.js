import { data } from 'autoprefixer';
import { useState, useEffect } from 'react';
import { signup, isAuth } from '../../actions/auth';

const SignupComponent = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })

    const { name, email, password, error, loading, message, showForm } = values;

    // if signed in, no signup/signin pages
    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false })
        const user = { name, email, password }
        signup(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    loading: false,
                    message: data.message, showForm: false
                })
            }
        })
    };

    const handleChange = name => (e) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? (<div class="bg-red-100 border-t border-b border-100 text-red-800 px-4 py-3 rounded m-2" role="alert">
        <p class="font-bold">Error!</p>
        <p class="text-sm">{error}</p>
    </div>) : '');
    const showMessage = () => (message ? (<div class="bg-forest-300 border-t border-b border-100 text-forest-200 px-4 py-3 rounded" role="alert">
        <p class="font-bold">Success!</p>
        <p class="text-sm">{message}</p>
    </div>) : '');


    const signupForm = () => {
        return (
            <div className="form-box backdrop-blur-md border-2 p-5 rounded-md w-96">
                <h1 className='flex justify-center text-white text-2xl underline my-3'>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group relative z-0 mb-6 w-full group">
                        <input value={name} type="text"
                            onChange={handleChange('name')}
                            className="form-control block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white 0 appearance-none  focus:outline-none focus:ring-0 focus:border-forest-100 peer" />
                        <label className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-forest-100 peer-focus:dark:text-forest-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                    </div>
                    <div className="form-group relative z-0 mb-6 w-full group">
                        <input value={email}
                            type="email"
                            onChange={handleChange('email')}
                            className="form-control block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:focus:border-forest-100 focus:outline-none focus:ring-0 focus:border-forest-100 peer" />
                        <label className="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-forest-100 peer-focus:dark:text-forest-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    </div>
                    <div className="form-group relative z-0 mb-6 w-full group">
                        <input value={password}
                            type="Password"
                            onChange={handleChange('password')}
                            className="form-control block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-white dark:focus:border-forest-100 focus:outline-none focus:ring-0 focus:border-forest-100 peer" />
                        <label className="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-forest-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>

                    <div className='flex justify-center'>
                        <button className="btn bg-forest-100 p-2 content-center rounded-md text-white hover:bg-forest-200 duration-300">Create Account</button>
                    </div>
                </form>
            </div>

        );
    }

    return (
        <>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signupForm()}
        </>
    )
};

export default SignupComponent;