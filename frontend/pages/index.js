import Layout from "../components/Layout";
import Hero from '../public/images/hero.svg';
import GitHub from '../public/icons/github.svg';
import Linkedin from '../public/icons/linkedin.svg';
import Mail from '../public/icons/mail.svg';
import Link from "next/link";
import { listCoursesWithCatAndTags } from "../actions/course";

const Index = ({ categories }) => {

    const showAllCategories = () => {
        return categories.map((c, i) => (
            <Link href={`/categories/${c.slug}`} className="text-forest-100 mx-2 mt-3 p-1 rounded-md text-center text-xl border-2 border-solid border-forest-100 hover:bg-forest-100 hover:text-azur-100" key={i}>
                {c.name}
            </Link>
        ));
    };

    return (
        <Layout>
            <div className="bg-azur-200 h-screen  justify-center">
                <div className="flex mx-10 gap-10">

                    <Hero className="flex-shrink-0" width={275}></Hero>

                    <div className="tracking-wider">
                        <h1 className={`text-forest-100 text-4xl my-8`}>Database enabling access to courses for continuing education</h1>
                        <h1 className="text-forest-300 text-2xl my-4 ">As a Concordia student, this database will be mostly filled with Concordia courses from Software Engineering, but if you feel like adding content to the page, please send a message!</h1>
                        <div className="w-96 flex gap-6">
                            <Link href="https://github.com/Adissuu/CoursesDB" target="_blank" className="w-10"><GitHub></GitHub></Link>
                            <Link href="https://www.linkedin.com/in/gabriel-dubois-soen/" target="_blank" className="w-10"><Linkedin></Linkedin></Link>
                            <Link href="mailto: coursesdbconco@gmail.com" className="w-10"><Mail></Mail></Link>
                        </div>
                    </div>
                </div>
                <h1 className="mt-12 text-3xl text-forest-100 text-center">Check out the available fields!</h1>
                <div className="grid grid-cols-3 mx-10">
                    {showAllCategories()}
                </div>
            </div>
        </Layout >
    );
}

Index.getInitialProps = () => {
    return listCoursesWithCatAndTags().then(data => {
        if (data.error) {
            console.log(data.error);
        }
        else {
            return {
                categories: data.categories,
            };
        }
    });
}

export default Index;