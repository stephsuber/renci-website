import React from 'react'
import styled from 'styled-components'
import { Container, Article, Section, Hero, HorizontalRule } from '../layout'
import { Title, Paragraph } from '../typography'
import { SocialLinks } from '../social-links'
import { MiniProfile } from '../people'
import { useAvatar } from '../../hooks'

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export const MembersList = ({ members }) => {
    const avatar = useAvatar()
    return (
        <Wrapper>
            {
                members.map(person => {
                    const photo = person.photo ? person.photo.childImageSharp.fixed : avatar.childImageSharp.fixed
                    return (
                        <MiniProfile
                            anchorId={ person.id }
                            key={ person.id }
                            name={ person.fullName }
                            title={ person.title }
                            photo={ photo }
                            path={ person.fields.path }
                        />
                    )
                })
            }
        </Wrapper>
    )
}
