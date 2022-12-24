import Layout from "../../components/Layout";
import Link from "next/link";
import { listCoursesWithCatAndTags } from "../../actions/course";
import { API } from "../../config";

const Courses = ({ courses, categories, tags, size }) => {
    const showAllCourses = () => {
        return courses.map((course, i) => {
            return (
                <>
                    <article key={i} className="mx-6 my-2 text-azur-100 bg-forest-100 p-4 rounded-xl hover:bg-forest-300">
                        <h1 className="text-xl">Field(s): </h1>
                        <div className="">
                            <header>
                                <Link href={`/courses/${course.slug}`} className="underline text-xl hover:text-forest-100">{course.title}</Link>
                            </header>
                            <section>Prerequisites: </section>
                            <h2>{course.excerpt}</h2>
                        </div>
                    </article>
                    <hr className="mx-40 border-forest-100 border rounded-md" />
                </>)
        })
    }

    return (
        <Layout>
            <div className="bg-azur-200 h-screen  justify-center">
                <h1 className="text-3xl text-center text-forest-100 underline my-6">List of all courses</h1>
                {showAllCourses()}
            </div>
        </Layout >
    );
}

Courses.getInitialProps = () => {
    return listCoursesWithCatAndTags().then(data => {
        if (data.error) {
            console.log(data.error);
        }
        else {
            return {
                courses: data.courses,
                categories: data.categories,
                tags: data.tags,
                size: data.size
            };
        }
    });
}

export default Courses;