import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";


const UserIndex = () => {
    return (
        <Layout>
            <Private>
                <h1 className="text-2xl">User Dashboard</h1>
            </Private>
        </Layout>
    )
}

export default UserIndex