import Link from "next/link";
import { API } from "../../config";


const Card = ({ course }) => {

    const showCourseCategories = course =>
        course.categories.map((c, i) => (
            <Link key={i} className="p-1 rounded-md border-2 border-solid border-forest-100 duration-100 hover:bg-forest-100" href={`/categories/${c.slug}`}>
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
            <h1 className="text-xl">Field(s): {showCourseCategories(course)} </h1><div className="">
                <header>
                    <Link href={`/courses/${course.slug}`} className="underline text-xl hover:text-green-700">{course.title}</Link>
                </header>
                <section>Prerequisites: {showCourseTags(course)}</section>
                <h2>{course.excerpt}</h2>
                <h2 className="text-lg text-end mr-6">By {course.postedBy.name}</h2>
            </div>
        </>
    );
}

export default Card;