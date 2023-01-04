import Link from "next/link"
import Layout from "../../components/Layout"
import { singleCategory } from "../../actions/category"
import Card from "../../components/course/Card"
import moment from "moment/moment"
import parse from 'html-react-parser'

const Category = ({ category, courses, query }) => {


    return (
        <>
            <Layout>
                <main>
                    <article>
                        <div className="mx-10">
                            <section>
                                <h1 className="text-5xl mt-6 underline text-blue-500 text-center">Field: {category.name}</h1>
                                {courses.map((c, i) => (
                                    <>
                                        <div className="mx-6 my-2 text-azur-100 bg-blue-500 p-4 rounded-xl hover:bg-blue-400" >
                                            <Card key={i} course={c}>
                                            </Card>
                                        </div>
                                    </>
                                ))}
                            </section>
                        </div>
                    </article>
                </main>
            </Layout>
        </>
    )
}

Category.getInitialProps = ({ query }) => {
    return singleCategory(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { category: data.category, courses: data.courses, query };
        }
    });
};

export default Category;