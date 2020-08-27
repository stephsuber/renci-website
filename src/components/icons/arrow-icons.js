import React from 'react'
import PropTypes from 'prop-types'

const ArrowIcon = ({ size, fill, children, ...rest }) => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" height={ `${ size }px` } width={ `${ size }px` } fill={ fill } viewBox="0 0 24 24" { ...rest }>
        { children }
    </svg>
)

export const ArrowUpIcon = props => (
    <ArrowIcon { ...props }>
        <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>
    </ArrowIcon>
)

export const ArrowDownIcon = props => (
    <ArrowIcon { ...props }>
        <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/>
    </ArrowIcon>
)

export const ArrowLeftIcon = props => (
    <ArrowIcon { ...props }>
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </ArrowIcon>
)

export const ArrowRightIcon = props => (
    <ArrowIcon { ...props }>
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
    </ArrowIcon>
)

const requiredProps = {
    fill: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
}

const defaultProps = {
    fill: '#fff',
    size: 24,
}

ArrowIcon.propTypes = requiredProps
ArrowIcon.defaultProps = defaultProps
