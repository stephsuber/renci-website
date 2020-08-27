import { graphql, useStaticQuery } from 'gatsby'

const avatarQuery = graphql`{
    avatar: file(absolutePath: {regex: "/staff-avatar.png/"}) {
        childImageSharp {
            fixed(height: 350, width: 350) {
                ...GatsbyImageSharpFixed
            }
        }
    }
}`

export const useAvatar = () => {
    const { avatar } = useStaticQuery(avatarQuery)
    return avatar
}
