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
                    {(courses.length != 0) ? < div className="flex flex-col">
                        {courses.map((c, i) => (
                            <Link key={i} href={`/courses/${c.slug}`}>
                                {c.title}
                            </Link>
                        ))}
                    </div> : '<p>ah.</p>'}
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