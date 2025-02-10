// components/CursorContext.js
"use client"
import { createContext, useState } from 'react';

export const CursorContext = createContext({
    cursorTarget: null,
    setCursorTarget: () => {},
    lockedElement: null,       // NEW
    setLockedElement: () => {},// NEW
});

export const CursorProvider = ({ children }) => {
    const [cursorTarget, setCursorTarget] = useState(null);
    const [lockedElement, setLockedElement] = useState(null); // NEW

    return (
        <CursorContext.Provider
            value={{
                cursorTarget,
                setCursorTarget,
                lockedElement,
                setLockedElement,
            }}
        >
            {children}
        </CursorContext.Provider>
    );
};
