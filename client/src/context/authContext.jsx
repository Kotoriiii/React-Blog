import { createContext,useState, useEffect } from "react";
import {post} from "../axios/request.js"

export const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    const login = async(inputs) => {
        const res = await post("/users/login", inputs)
        setCurrentUser(res)
    }

    const logout = async () => {
        await post("/users/logout")
        setCurrentUser(null)
    }

    useEffect(() => {
        localStorage.setItem('user',JSON.stringify(currentUser))
    },[currentUser])

    return <AuthContext.Provider value={{currentUser,login,logout}}>{children}</AuthContext.Provider>
}