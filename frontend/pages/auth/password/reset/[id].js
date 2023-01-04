import { useState, useEffect } from "react";
import Layout from "../../../../components/Layout";
import { resetPassword } from "../../../../actions/auth";
import { withRouter } from "next/router";

const ResetPassword = ({ router }) => {
    const [values, setValues] = useState({
        name: '',
        newPassword: '',
        error: '',
        message: '',
        showForm: true
    });

    const { showForm, name, newPassword, error, message } = values;

    const handleSubmit = e => {
        e.preventDefault();
        resetPassword({
            newPassword,
            resetPasswordLink: router.query.id
        }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, showForm: false, newPassword: '' });
            } else {
                setValues({ ...values, message: data.message, showForm: false, newPassword: '', error: false });
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


    const passwordResetForm = () => (
        <div className="mx-2 mt-16"
        >
            <form onSubmit={handleSubmit}>
                <div className="">
                    <input type="password" onChange={e => setValues({ ...values, newPassword: e.target.value })} className="rounded-md bg-azur-100 h-10 pl-2 mb-2 text-forest-100 text-2xl" value={newPassword} placeholder="New password" required />
                </div>
                <button type="submit" className="bg-forest-100 rounded-md p-2">Change Password</button>
            </form>
        </div>
    );

    return (
        <Layout>
            <div className="flex justify-center">
                <div className="">
                    <h1 className="text-5xl text-forest-100 pt-4">Change Password</h1>
                    {showError()}
                    {showMessage()}
                    {showForm && passwordResetForm()}
                </div>
            </div>
        </Layout>
    )

}

export default withRouter(ResetPassword);