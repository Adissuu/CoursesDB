import Layout from "../../components/Layout";
import Link from "next/link";
import { userPublicProfile } from "../../actions/user";
import moment from "moment/moment";

const UserProfile = ({ user, courses }) => {
    return (
        <>
            <Layout>
                <div>
                    <h1 className="text-center text-forest-100 text-6xl ">{user.name}</h1>
                    <p className="pl-2 text-center text-forest-100 text-xl">{user.email}</p>
                    <div className="flex justify-between">
                        <section className="ml-4 mr-2 flex-1">
                            <h1 className="pl-2 text-forest-100 text-2xl">Courses created</h1>
                            {(courses.length != 0) ?
                                <div className="flex flex-col rounded-md bg-azur-100 ">
                                    {
                                        courses.map((c, i) => (
                                            <Link className="pl-2 text-forest-100 hover:bg-azur-400 rounded" key={i} href={`/courses/${c.slug}`}>
                                                {c.title} - {moment(c.createdAt).fromNow()}
                                            </Link>
                                        ))
                                    }
                                </div>
                                : <div className="rounded-md bg-azur-100">
                                    <p className="pl-2 text-forest-100 text-center">No course created.</p>
                                </div>}
                        </section>
                        <section className="mr-4 ml-2 flex-1">
                            <h1 className="pl-2 text-forest-100 text-2xl">About {user.name}</h1>
                            <div className="flex flex-col rounded-md bg-azur-100 text-forest-100">

                                <p className="pl-2"> {user.about}</p>
                            </div>
                        </section>
                    </div>
                </div>
            </Layout>
        </>
    )
}


UserProfile.getInitialProps = ({ query }) => {

    return userPublicProfile(query.username).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { user: data.user, courses: data.courses, query };
        }
    });
};

export default UserProfile;