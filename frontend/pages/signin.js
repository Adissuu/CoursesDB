import Layout from "../components/Layout";
import SigninComponent from "../components/auth/signin-component";


const Signin = () => {
    return (
        <Layout>
            <div className="
            grid justify-center content-center bg-signupChar h-screen">
                <SigninComponent className="z-auto" />
            </div>
        </Layout>
    )
}

export default Signin