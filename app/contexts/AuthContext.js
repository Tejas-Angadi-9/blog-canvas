"use client"
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const userData = localStorage.getItem("UserData");
    const parsedUserData = JSON.parse(userData);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(parsedUserData);

    return (
        <AuthContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}