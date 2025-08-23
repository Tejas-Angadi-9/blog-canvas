"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Loading from "@/components/common/Loading"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
    const [allBlogsData, setAllBlogsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [blogsLoading, setBlogsLoading] = useState(true);

    const getAllBlogs = async () => {
        setBlogsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/blogs`);
            const output = await response.json();
            setAllBlogsData(output);
        } catch (err) {
            console.error("Internal server while fetching blogs", err);
        } finally {
            setBlogsLoading(false);
        }
    };

    const checkUser = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`);
            const output = await response.json();

            if (output.status === false)
                setIsUserLoggedIn(null);
        }
        catch (err) {
            console.error("Internal server error while checking the User authencity");
        }
    }

    useEffect(() => {
        const init = async () => {
            if (typeof window !== "undefined") {
                const userData = localStorage.getItem("UserData");
                const parsedUserData = userData ? JSON.parse(userData) : null;
                setIsUserLoggedIn(parsedUserData);
            }
            await getAllBlogs();   // wait for blogs
            setIsLoading(false);   // only stop loading after fetch is done
        };

        init();
    }, []);


    return (
        <AuthContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn, allBlogsData, setAllBlogsData, checkUser, getAllBlogs, setBlogsLoading, blogsLoading }}>
            {isLoading && <Loading />}
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}