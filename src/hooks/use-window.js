import { useState, useEffect } from 'react'

let defaultWidth, defaultHeight

// This conditional makes the build work.
// The browser handles this fine during development, however Node has no window object, so we check here to see if it exists.
// So, ts is really a check to see if we're in the build or run time
if (typeof window !== 'undefined') {
    defaultWidth = window.innerWidth
    defaultHeight = window.innerWidth
}

export const useWindow = () => {
    const [windowWidth, setWindowWidth] = useState(defaultWidth)
    const [windowHeight, setWindowHeight] = useState(defaultHeight)
    
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
            setWindowHeight(window.innerHeight)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })
    
    return { windowWidth, windowHeight }
}
