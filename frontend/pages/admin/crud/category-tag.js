import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/Category";
import Link from "next/link";

const CategoryTag = () => {
    return (
        <Layout>
            <div className="bg-azur-200">
                <Admin>
                    <h1>Manage Categories and Tags</h1>
                    <Category />
                    <p>Tags</p>
                </Admin>
            </div>
        </Layout>
    )
}

export default CategoryTag