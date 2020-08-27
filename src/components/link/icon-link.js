import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.a.attrs(
    props => ({ target: '_blank', rel: 'noopener noreferrer', href: props.to })
)(({ theme }) => `
    background-color: ${ theme.color.lightgrey };
    border-radius: 50%;
    height: 44px;
    width: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
`)

export const IconLink = ({ icon, ...rest }) => {
    // const Icon = React.cloneElement(icon)
    return (
        <Wrapper { ...rest }>
            { icon }
        </Wrapper>
    )
}
