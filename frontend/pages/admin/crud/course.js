import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import CourseCreate from "../../../components/crud/CourseCreate.js";
import Link from "next/link";

const Course = () => {
    return (
        <Layout>
            <div className="bg-azur-200 h-screen">
                <Admin>
                    <h1 className="text-center tracking-wider text-xl text-forest-100 mb-4 pt-8 underline">Creating a new course</h1>
                    <div className="flex flex-col justify-evenly">
                        <CourseCreate />
                    </div>
                </Admin>
            </div>
        </Layout>
    )
}

export default Course