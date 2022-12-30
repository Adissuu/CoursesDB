import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import CourseUpdate from "../../../components/crud/CourseUpdate.js";
import Link from "next/link";

const Course = () => {
    return (
        <Layout>
            <div className="bg-azur-200 h-screen">
                <Admin>
                    <h1 className="text-center tracking-wider text-3xl text-forest-100 mb-4 pt-8 underline">Update Course</h1>
                    <div className="flex flex-col justify-evenly">
                        <CourseUpdate />
                    </div>
                </Admin>
            </div>
        </Layout>
    )
}

export default Course