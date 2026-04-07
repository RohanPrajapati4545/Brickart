// const { createContext, useState, useEffect } = require("react");

import { createContext, useEffect, useState } from "react"


const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(null)
     const [email, setEmail] = useState(null)
    const [role, setRole] = useState(null)
    const [isAuth, setIsAuth] = useState(false)




    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedRole = localStorage.getItem('role')
         const storedEmail = localStorage.getItem('email')

        if (storedToken) {
            setToken(storedToken)
            setRole(storedRole)
            setEmail(storedEmail)
            setIsAuth(true)
        }


    }, [])

    const login = (token, role, email) => {
        localStorage.setItem("token", token)
        localStorage.setItem("role", role)
            localStorage.setItem('email',email)

        setToken(token)
        setRole(role)
        setEmail(email)
        setIsAuth(true)
    }
    const logout = () => {
        localStorage.clear()
        setToken(null)
        setRole(null)
          setEmail(null)
        setIsAuth(false)
    }




    return (
        <AuthContext.Provider value={{ token, role, isAuth, login, logout,email }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider
export { AuthContext }
