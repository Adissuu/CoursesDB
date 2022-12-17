import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import Link from "next/link";


const AdminIndex = () => {
    return (
        <Layout>
            <div className="bg-azur-200 h-screen">
                <Admin>
                    <h1 className="text-center tracking-wider text-xl text-forest-100 mb-14 underline">Admin Dashboard</h1>
                    <div className="flex justify-center">
                        <Link href="/admin/crud/category-tag" className="text-center">
                            <h1 className="border-2 border-forest-100 border-solid w-64 text-center text-forest-100 hover:text-azur-100 hover:bg-forest-100">Manage Categories and Tags</h1>
                        </Link>
                    </div>
                </Admin>
            </div>
        </Layout>
    )
}

export default AdminIndex