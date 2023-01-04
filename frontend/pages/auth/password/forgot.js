import { useState } from "react";
import Layout from "../../../components/Layout";
import { forgotPassword } from "../../../actions/auth";

const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: '',
        message: '',
        error: '',
        showForm: true
    });

    const { email, message, error, showForm } = values;

    const handleChange = name => e => {
        setValues({ ...values, message: '', error: '', [name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, message: '', error: '' });
        forgotPassword({ email }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, message: data.message, email: '', showForm: false });
            }
        });
    };

    const showError = () => (
        <div className="bg-red-100 border-t border-b border-100 text-red-800 px-4 py-3 rounded m-2" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showMessage = () => (
        <div className="bg-forest-300 border-t border-b border-100 text-forest-200 px-4 py-3 mx-16 mt-2 rounded" style={{ display: message ? '' : 'none' }}>
            {message}
        </div>
    );


    const passwordForgotForm = () => (
        <div className="mx-2 mt-16"
        >
            <form onSubmit={handleSubmit}>
                <div className="">
                    <input type="email" onChange={handleChange('email')} className="rounded-md bg-azur-100 h-10 pl-2 mb-2 text-forest-100 text-2xl" value={email} placeholder="Your email goes here" required />
                </div>
                <button type="submit" className="bg-forest-100 rounded-md p-2">Send Link</button>
            </form>
        </div>
    );

    return (
        <Layout>
            <div className="flex justify-center">
                <div className="">
                    <h1 className="text-5xl text-forest-100 pt-4">Forgot Password</h1>
                    {showError()}
                    {showMessage()}
                    {showForm && passwordForgotForm()}
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword;