import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import Link from "next/link";


const AdminIndex = () => {
    return (
        <Layout>
            <div className="bg-azur-200">
                <Admin>
                    <h1>Admin Dashboard</h1>
                    <Link href="/admin/crud/category-tag">
                        <h1>Create Category</h1>
                    </Link>
                </Admin>
            </div>
        </Layout>
    )
}

export default AdminIndex