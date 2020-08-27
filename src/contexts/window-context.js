import React, { createContext } from 'react'
import { useWindow } from '../hooks'

export const WindowContext = createContext()

export const WindowContextProvider = ({ children }) => {
    const { windowWidth, windowHeight } = useWindow()

    return (
        <WindowContext.Provider value={{ windowWidth, windowHeight }}>
            { children }
        </WindowContext.Provider>
    )
}

