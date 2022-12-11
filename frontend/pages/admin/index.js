import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";


const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
                <h1 className="text-2xl">Admin Dashboard</h1>
            </Admin>
        </Layout>
    )
}

export default AdminIndex