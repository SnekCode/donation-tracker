'use client'

import { useEffect, useState } from "react";

const useDarkMode = () => {   
    console.log("useDarkMode");
    // by using useState here we ensure this hook can only be used by client
    // next js will not render this hook on the server
    const [darkMode, setDarkMode] = useState(false)

    // set up use effect
    useEffect(() => {
        setDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)

    }, [setDarkMode])


    return darkMode
}

export default useDarkMode