/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso)
 * This file is part of the Lalulla System.
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : June 26, 2026 01:29 AM
 * ------------------------------------------------------------------------
 */

import { useState, useEffect } from 'react';

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

//Usage:

// import { useWindowSize } from './useWindowSize'; // update path as needed

// function MyComponent() {
//     const { width } = useWindowSize();

//     return (
//         <div>
//             {width < 768 ? <p>You are on Mobile 📱</p> : <p>You are on Desktop 💻</p>}
//         </div>
//     );
// }