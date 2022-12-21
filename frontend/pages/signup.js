import Layout from "../components/Layout";
import SignupComponent from "../components/auth/signup-component";


const Signup = () => {
    return (
        <Layout>
            <div className="
            flex flex-row items-center align-center justify-center bg-signupChar h-screen">
                <SignupComponent className="z-auto" />
            </div>
        </Layout>
    )
}

export default Signup