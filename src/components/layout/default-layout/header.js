import styled from 'styled-components'
import PropTypes from 'prop-types'

export const Header = styled.header(({ theme, compact, dark }) => `
    position: sticky;
    top: 0;
    z-index: 1;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    background-color: ${ theme.color.whitish };
    padding: 0 1rem;
    ${ dark ? `background-color: ${ theme.color.black };` : undefined };
    transition: background-color 250ms;
    border-bottom: 1px solid ${ theme.color.lightgrey };
    filter: drop-shadow(0 0 6px ${ theme.color.darkgrey }33);
`)

Header.propTypes = {
    children: PropTypes.node.isRequired,
}
