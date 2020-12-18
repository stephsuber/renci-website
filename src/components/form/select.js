import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const chevronSvg = `data:image/svg+xml;utf8,
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path fill="none" d="M0 0h24v24H0V0z"/>
    <path fill="black" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
  </svg>
`

const Wrapper = styled.select(({ theme }) => `
  padding: 0 2rem 0 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  background: url('${ chevronSvg }') 100% / 24px no-repeat transparent;
  transition: border-color 250ms;
  border-bottom: 1px solid ${ theme.color.grey };
  &:focus, &:hover {
    border-color: ${ theme.color.black };
  }
`)

export const Option = styled.option``

export const Select = ({ name, options, ...props }) => {
  return (
    <Wrapper name={ name } { ...props }>
      { options.map(({ value, label }) => <Option key={ value } value={ value }>{ label }</Option>) }
    </Wrapper>
  )
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
}
