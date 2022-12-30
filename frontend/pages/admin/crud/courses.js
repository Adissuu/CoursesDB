import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import CourseRead from "../../../components/crud/CourseRead.js";


const Course = () => {
    return (
        <Layout>
            <div className="bg-azur-200 h-screen">
                <Admin>
                    <h1 className="text-center tracking-wider text-3xl text-violet-400 mb-4 pt-8 underline">Course Manager</h1>
                    <div className="flex flex-col justify-evenly">
                        <CourseRead />
                    </div>
                </Admin>
            </div>
        </Layout>
    )
}

export default Course