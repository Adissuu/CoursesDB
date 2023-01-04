import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import ProfileUpdate from '../../components/auth/ProfileUpdate'
import Link from "next/link";

const UserProfileUpdate = () => {
    return (
        <Layout>
            <ProfileUpdate />
        </Layout>
    )
}

export default UserProfileUpdate