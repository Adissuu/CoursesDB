import Layout from "../components/Layout";
import Link from "next/link";

const Index = () => {
    return (
        <Layout>
            <h1 className="text-2xl">Index Page</h1>
            <Link href="/signup">
                Signup
            </Link>
            <br></br>
            <Link href="/signin">
                Signin
            </Link>
        </Layout>
    )
}

export default Index