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
 * CREATED DATE : June 26, 2026 01:34 AM
 * ------------------------------------------------------------------------
 */

import { useState, useEffect } from 'react';

export const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const updatePosition = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', updatePosition);
        updatePosition();

        return () => window.removeEventListener('scroll', updatePosition);
    }, []);

    return scrollPosition;
};

//Usage:

// import { useScrollPosition } from './useScrollPosition'; // update path as needed
//
// function MyComponent() {
//     const scrollY = useScrollPosition();
//
//     return (
//         <div>
//             <p>Current scroll position is: {scrollY}px</p>
//             {scrollY > 100 ? <button>Back to Top ⬆️</button> : null}
//         </div>
//     );
// }