import Link from "next/link"
import Layout from "../../components/Layout"
import { singleTag } from "../../actions/tag"
import Card from "../../components/course/Card"
import moment from "moment/moment"


const Tag = ({ tag, courses, query }) => {


    return (
        <>
            <Layout>
                <main>
                    <article>
                        <div className="mx-10">
                            <section>
                                <h1 className="text-5xl mt-6 underline text-indigo-500 text-center">Prerequisite: {tag.name}</h1>
                                {courses.map((t, i) => (
                                    <>
                                        <div className="mx-6 my-2 text-azur-100 bg-indigo-500 p-4 rounded-xl hover:bg-indigo-400" >
                                            <Card key={i} course={t}>
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

Tag.getInitialProps = ({ query }) => {
    return singleTag(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { tag: data.tag, courses: data.courses, query };
        }
    });
};

export default Tag;