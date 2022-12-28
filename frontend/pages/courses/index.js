import Layout from "../../components/Layout";
import { listCoursesWithCatAndTags } from "../../actions/course";
import Link from "next/link";
import Card from '../../components/course/Card'
import { useState } from "react";
import { withRouter } from "next/router"

const Courses = ({ courses, categories, router }) => {


    const showAllCategories = () => {
        return categories.map((c, i) => (
            <Link href={`/categories/${c.slug}`} className="text-forest-100 mx-2 mt-3 p-1 rounded-md border-2 border-solid border-forest-100 hover:bg-forest-100 hover:text-azur-100" key={i}>
                {c.name}
            </Link>
        ));
    };
    const showAllCourses = () => {
        return courses.map((course, i) => {
            return (
                <article key={i} >
                    <div className="mx-6 my-2 text-azur-100 bg-forest-100 p-4 rounded-xl hover:bg-green-400">
                        <Card course={course}></Card>
                    </div>
                    <hr className="mx-40 border-forest-100 border rounded-md" />
                </article>
            )
        })
    }
    return (
        <Layout>
            <div className="bg-azur-200 h-screen  justify-center">
                <h1 className="text-xl text-center text-forest-100 my-6">Fields available</h1>
                <div className="text-center">
                    {showAllCategories()}
                </div>
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
                size: data.size,

            };
        }
    });
}

export default withRouter(Courses);