import Layout from "../components/Layout";
import Hero from '../public/images/hero.svg'


const Index = () => {
    return (
        <Layout>
            <div className="bg-azur-200 h-screen  justify-center">
                <div className="flex mx-10 gap-10">
                    <Hero className="w-96"></Hero>
                    <div className="tracking-wider">
                        <h1 className={`text-forest-100 text-xl my-8 font-bold`}>Database enabling access to courses for continuing education</h1>
                        <h1 className="text-forest-300 text-sm my-4 font-bold">As a Concordia student, this database will be mostly filled with Concordia courses from Software Engineering, but if you feel like adding content to the page, please send a message!</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Index