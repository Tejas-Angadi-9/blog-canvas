"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Loading from "@/components/common/Loading"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
    const [allBlogsData, setAllBlogsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getAllBlogs = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/blogs`);
            const output = await response.json();

            if (output) setAllBlogsData(output);
        }
        catch (err) {
            console.log("Failed to fetch all the blogs");
            console.error(err.message);

        }
    }


    useEffect(() => {
        if (typeof window !== "undefined") {
            const userData = localStorage.getItem("UserData");
            const parsedUserData = userData ? JSON.parse(userData) : null;
            setIsLoading(false)
            setIsUserLoggedIn(parsedUserData);
        }
        getAllBlogs();
    }, [])


    return (
        <AuthContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn, allBlogsData, setAllBlogsData }}>
            {isLoading && <Loading />}
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}