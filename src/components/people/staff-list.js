import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MiniProfile } from './mini-profile'
import { useAvatar } from '../../hooks'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const Sticker = styled.div`
    position: relative;
`

const LettersMenu = styled.nav(({ theme }) => `
    position: sticky;
    top: 8rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: ${ theme.spacing.small };
`)

const LetterLink = styled.a(({ theme }) => `
    text-decoration: none;
    padding: 0.25rem 0.5rem;
    border-radius 4px;
    transition: background-color 250ms, color 250ms;
    &:hover {
        background-color: ${ theme.color.lightgrey };
    }
`)

const Profiles = styled.div(({ theme }) => `
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin: ${ theme.spacing.medium };
    & > * {
        margin-right: ${ theme.spacing.medium };
        margin-bottom: ${ theme.spacing.medium };
    }
`) 

export const StaffList = ({ staff = [], nav }) => {
    const avatar = useAvatar()
    const [letters, setLetters] = useState([])
    let previousLetter = '?'
    let currentLetter
    
    useEffect(() => {
        const requiredLetters = new Set(staff.map(person => person.name.last[0]))
        setLetters([...requiredLetters])
    }, [staff])

    return (
        <Wrapper>
            {
                nav && (
                    <Sticker>
                       <LettersMenu>
                           { letters.map(letter => <LetterLink key={ letter } href={ `#${ letter.toLowerCase() }` }>{ letter }</LetterLink>) }
                       </LettersMenu>
                    </Sticker>
                )
            }
            <Profiles>
                {
                    staff.map(person => {
                        const photo = person.photo ? person.photo.childImageSharp.fixed : avatar.childImageSharp.fixed
                        previousLetter = currentLetter
                        currentLetter = person.name.last[0].toLowerCase()
                        const anchorId = nav && currentLetter !== previousLetter ? currentLetter : null
                        return (
                            <MiniProfile
                                anchorId={ anchorId }
                                key={ person.id }
                                name={ person.fullName }
                                title={ person.title }
                                photo={ photo }
                                path={ person.fields.path }
                            />
                        )
                    })
                }
            </Profiles>
        </Wrapper>
    )
}

