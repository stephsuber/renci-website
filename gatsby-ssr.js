import React from 'react'
import { DefaultLayout } from './src/components/layout'
import { WindowContextProvider } from './src/contexts'
import { ThemeProvider } from 'styled-components'
import { theme } from './src/theme'

export const wrapRootElement = ({ element }) => {
    // props provide same data to Layout as Page element will get
    // including location, data, etc - you don't need to pass it
    return (
        <ThemeProvider theme={ theme }>
            <WindowContextProvider>
                { element }
            </WindowContextProvider>
        </ThemeProvider>
    )
}

export const wrapPageElement = ({ element, props }) => {
    // props provide same data to Layout as Page element will get
    // including location, data, etc - you don't need to pass it
    return (
        <DefaultLayout currentPath={ props.path }>
            { element }
        </DefaultLayout>
    )
}