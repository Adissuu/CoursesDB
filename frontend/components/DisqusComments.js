import { DISQUS_SHORTNAME, API } from '../config';
import { DiscussionEmbed } from "disqus-react"

const DisqusComments = ({ post }) => {
    const disqusShortname = "coursesdb"
    const disqusConfig = {
        url: `${API}`
        ,
        identifier: post.id, // Single post id
        title: post.title // Single post title
    }

    return (
        <div>
            <DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
            />
        </div>
    )
}

export default DisqusComments;