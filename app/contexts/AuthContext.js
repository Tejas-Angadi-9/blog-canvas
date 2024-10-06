"use client"
import react, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}