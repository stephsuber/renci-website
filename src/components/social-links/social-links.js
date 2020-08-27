import React from 'react'
import styled from 'styled-components'
import { Tooltip } from '../tooltip'
import { IconLink } from '../link'
import { LinkIcon, TwitterIcon, GitHubIcon, InstagramIcon, LinkedInIcon, YoutubeIcon } from '../icons'

const Wrapper = styled.div(({ theme }) => `
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    & > * { margin: 0 0.25rem; }
    svg {
        fill: ${ theme.color.darkgrey };
    }
    a {
        transition: filter 250ms;
    }
    a:hover, a:focus {
        filter: brightness(0.9);
        svg {
            transition: fill 500ms;
            fill: ${ theme.color.renciBlue };
        }
    }
`)

export const SocialLinks = ({ url, twitter, github, instagram, linkedin, youtube }) => {
    return (
        <Wrapper>
            { url && <Tooltip tip="Website"><IconLink to={ url } aria-label="View Website" icon={ <LinkIcon size={ 24 } /> }></IconLink></Tooltip> }
            { twitter && <Tooltip tip="Twitter"><IconLink to={ `https://twitter.com/${ twitter }` } aria-label="View Twitter Profile" icon={ <TwitterIcon size={ 24 } /> }></IconLink></Tooltip> }
            { github && <Tooltip tip="GitHub"><IconLink to={ `https://github.com/${ github }` } aria-label="View GitHub Page" icon={ <GitHubIcon size={ 24 } /> }></IconLink></Tooltip> }
            { instagram && <Tooltip tip="Instagram"><IconLink to={ `https://instagram.com/${ instagram }` } aria-label="View Instagram Profile" icon={ <InstagramIcon size={ 24 } /> }></IconLink></Tooltip> }
            { linkedin && <Tooltip tip="LinkedIn"><IconLink to={ `https://linkedin.com/${ linkedin }` } aria-label="View LinkedIn Profile" icon={ <LinkedInIcon size={ 24 } /> }></IconLink></Tooltip> }
            { youtube && <Tooltip tip="YouTube"><IconLink to={ `https://youtube.com/${ youtube }` } aria-label="View YouTube Profile" icon={ <YoutubeIcon size={ 24 } /> }></IconLink></Tooltip> }
        </Wrapper>
    )
}
