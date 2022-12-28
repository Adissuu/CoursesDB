import Link from "next/link"
import Layout from "../../components/Layout"
import { singleCourse } from "../../actions/course"
import moment from "moment/moment"
import parse from 'html-react-parser'

const SingleCourse = ({ course }) => {

    const showCourseCategories = course =>
        course.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                {c.name}
            </Link>
        ));


    const showCourseTags = course =>
        course.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                {t.name}
            </Link>
        ))


    return (
        <>
            <Layout>
                <main>
                    <article>
                        <div className="flex">
                            <section>
                                <h1>Written by {course.postedBy.name} | Published {moment(course.updatedAt).fromNow()}</h1>
                                <h1>{course.title}</h1>
                                {showCourseCategories(course)}
                                {showCourseTags(course)}
                                <div className="body">
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