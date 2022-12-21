import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tags";
import Link from "next/link";

const CategoryTag = () => {
    return (
        <Layout>
            <div className="bg-azur-200 h-screen">
                <Admin>
                    <h1 className="text-center text-3xl tracking-wider text-xl text-forest-100 mb-4 pt-8 underline">Manage Categories and Tags</h1>
                    <div className="flex flex-col justify-evenly">
                        <Category />
                        <Tag />
                    </div>
                </Admin>
            </div>
        </Layout>
    )
}

export default CategoryTag