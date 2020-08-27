import React from 'react'

export const PlayIcon = ({ size, fill, ...rest }) => {
    return (
        <svg { ...rest } fill={ fill } version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={ `${ size }px` } height={ `${ size }px` } viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    )
}
