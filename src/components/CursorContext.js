// components/CursorContext.js
"use client"
import { createContext, useState } from 'react';

export const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
    const [cursorTarget, setCursorTarget] = useState(null);

    return (
        <CursorContext.Provider value={{ cursorTarget, setCursorTarget }}>
            {children}
        </CursorContext.Provider>
    );
};