import React, { Fragment } from 'react'
import { useTheme } from 'styled-components'
import { graphql, Link } from 'gatsby'
import { Container, Hero, HorizontalRule } from '../components/layout'
import { Meta, Title } from '../components/typography'
import { Visible } from 'react-grid-system'
import { ArrowLeftIcon, ArrowRightIcon } from '../components/icons'
import { TagLink } from '../components/link'

export default ({ data, pageContext }) => {
    const theme = useTheme()
    const { article: {
        frontmatter: {
            title, publish_date, author, featuredImage,
            people, groups, projects, teams, collaborations,
        },
        html: articleHTML
    }} = data
    const { prevArticle, nextArticle } = pageContext

    return (
        <Fragment>
            { featuredImage && <Hero backgroundImage={ featuredImage && featuredImage.childImageSharp.fullSize }></Hero> }

            <Container>
                <Title>{ title }</Title>

                <Meta>
                    Published on { publish_date } by <Link to={ `/people/${ author.id }` }>{ author.fullName }</Link> <br/>
                </Meta>

                <HorizontalRule />

                <div style={{ padding: '1rem 0 0 0' }} dangerouslySetInnerHTML={{ __html: articleHTML }} />

                <HorizontalRule />

                <Meta>
                    People: { people.map(person => <TagLink key={ person.id } to={ person.fields.path }>{ person.fullName }</TagLink>) } <br/><br/>
                    Groups: { groups.map(group => <TagLink key={ group.id } to={ group.fields.path }>{ group.name }</TagLink>) } <br/><br/>
                    Teams: { teams.map(team => <TagLink key={ team.id } to={ team.fields.path }>{ team.name }</TagLink>) } <br/><br/>
                    Projects: { projects.map(project => <TagLink key={ project.id } to={ project.fields.path }>{ project.name }</TagLink>) } <br/><br/>
                    Collaborations: { collaborations.map(collaboration => <TagLink key={ collaboration.id } to={ collaboration.fields.path }>{ collaboration.name }</TagLink>) }
                </Meta>

                <HorizontalRule />

                <div style={{ display: 'flex', padding: '1rem 0' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        {
                            prevArticle && (
                                <Fragment>
                                    <Link to={ prevArticle.path } style={{ display: 'inline-flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <ArrowLeftIcon size={ 16 } fill={ theme.color.darkgrey } />
                                        PREVIOUS <Visible md lg xl>ARTICLE</Visible><br/>
                                    </Link>
                                    <Meta style={{ paddingLeft: '1rem' }}>{ prevArticle.frontmatter.title }</Meta>
                                </Fragment>
                            )
                        }
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        {
                            nextArticle && (
                                <Fragment>
                                    <Link to={ nextArticle.path } style={{ display: 'inline-flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        NEXT <Visible md lg xl>ARTICLE</Visible>
                                        <ArrowRightIcon size={ 16 } fill={ theme.color.darkgrey } />
                                    </Link>
                                    <Meta style={{ paddingRight: '1rem' }}>{ nextArticle.frontmatter.title }</Meta>
                                </Fragment>
                            )
                        }
                    </div>
                </div>
            </Container>
        </Fragment>
    )
}

export const newsQuery = graphql`
    query($slug: String!) {
        article: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            frontmatter {
                title
                featuredImage {
                    childImageSharp {
                        fullSize: fluid {
                            ...GatsbyImageSharpFluid
                        }
                        previewSize: fixed(width: 300, height: 300) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
                publish_date(formatString: "dddd, MMMM Do, YYYY")
                author {
                    id
                    fullName
                    fields {
                        path
                    }
                }
                people {
                    id
                    fullName
                    fields {
                        path
                    }
                }
                groups {
                    id
                    name
                    fields {
                        path
                    }
                }
                projects {
                    id
                    name
                    fields {
                        path
                    }
                }
                teams {
                    id
                    name
                    fields {
                        path
                    }
                }
                collaborations {
                    id
                    name
                    fields {
                        path
                    }
                }
            }
            html
        }
    }
`