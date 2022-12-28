import Link from "next/link"
import Layout from "../../components/Layout"
import { singleCourse } from "../../actions/course"
import moment from "moment/moment"
import parse from 'html-react-parser'

const SingleCourse = ({ course }) => {

    const showCourseCategories = course =>
        course.categories.map((c, i) => (
            <Link className="text-forest-300 p-1 rounded-md border-forest-300 border hover:text-forest-100 hover:border-forest-100" key={i} href={`/categories/${c.slug}`}>
                {c.name}
            </Link>
        ));


    const showCourseTags = course =>
        course.tags.map((t, i) => (
            <Link className="text-forest-300 hover:text-forest-100" key={i} href={`/tags/${t.slug}`}>
                {` ${t.name}`}
            </Link>
        ))


    return (
        <>
            <Layout>
                <main>
                    <article>
                        <div className="mx-10">
                            <section>
                                <div className="text-forest-100 text-xl mt-4 px-6 py-4 rounded-md bg-azur-100 mb-2" >
                                    {showCourseCategories(course)}
                                    <h1 className="text-5xl">{course.title}</h1>
                                    <h1 className="">Written by {course.postedBy.name} - {moment(course.updatedAt).fromNow()}</h1>
                                    <hr className="w-96 border-forest-100" />
                                    <div className="">
                                        Prerequisite:
                                        {showCourseTags(course)}
                                    </div>
                                </div>
                                <div className="body drop-shadow-xl">
                                    {parse(course.body)}
                                </div>
                            </section>
                        </div>
                    </article>
                </main>
            </Layout>
        </>
    )
}

SingleCourse.getInitialProps = async ({ query }) => {
    try {
        const data = await singleCourse(query.slug);
        return { course: data, query };
    } catch (error) {
        console.error(error);
    }
};
export default (SingleCourse)