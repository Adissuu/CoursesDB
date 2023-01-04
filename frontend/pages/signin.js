import Layout from "../components/Layout";
import { withRouter } from "next/router";
import SigninComponent from "../components/auth/signin-component";


const Signin = ({ router }) => {

    const showRedirectMessage = () => {
        if (router.query.message) {
            return <div className="absolute top-1/4 bg-red-100 border-t border-b border-100 text-red-800 px-4 py-3 rounded m-2" role="alert">
                <p className="text-sm">{router.query.message}</p>
            </div>;
        } else {
            return;
        }
    };

    return (
        <Layout>
            <div className="
              flex flex-row items-center align-center justify-center bg-signupChar h-screen">
                {showRedirectMessage()}
                <SigninComponent className="z-auto" />
            </div>
        </Layout>
    )
}

export default withRouter(Signin)