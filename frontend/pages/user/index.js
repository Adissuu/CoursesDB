import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import Link from "next/link";


const UserIndex = () => {
    return (
        <Layout>
            <div className="bg-azur-200 h-screen">
                <Private>
                    <h1 className="text-center tracking-wider text-3xl text-forest-100 mb-14 underline">User Dashboard</h1>
                    <div className="flex flex-col items-center">
                        <Link href="/user/update" className="text-center">
                            <h1 className="border-2 border-forest-100 border-solid w-96 mb-4 text-2xl text-center text-forest-100 hover:text-azur-100 hover:bg-forest-100">Update Profile</h1>
                        </Link>

                    </div>
                </Private>
            </div>
        </Layout>
    )
}

export default UserIndex