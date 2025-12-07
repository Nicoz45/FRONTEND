import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken, useJwt } from "react-jwt";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    //Configuramos para hacer mas adelante redirecciones
    const navigate = useNavigate()
    // Estamos guardando datos de sesion
    const [user, setUser] = useState(null)
    //Marca si esta o no logueado el usuario.
    const [isLogged, setIsLogged] = useState(Boolean(localStorage.getItem('auth_token')))
    /* const { decodedToken, isExpired } = useJwt(localStorage.getItem('auth_token')) */

    //Una vez se monte el componente, decodificar el token y guardar los datos de sesion
    useEffect(() => {
        if(!localStorage.getItem('auth_token')) {
            setIsLogged(false)
            setUser(null)
            return}
        const user = decodeToken(localStorage.getItem('auth_token'))
        if (user) {
            setUser(user)
            setIsLogged(true)
            return
        }
        else{
            setIsLogged(false)
            setUser(null)
        }
    }, []
    )

    const onLogout = () => {
        //Hacemos que se borre el auth_token cuando cerramos sesion
        localStorage.removeItem('auth_token')
        setIsLogged(false)
        setUser(null)
        //Podemos hacer una redireccion una vez que se cierre la sesion
        navigate('/login')
    }

    const onLogin = (auth_token) => {
        localStorage.setItem('auth_token', auth_token)
        setIsLogged(true)
        const user_session = decodeToken(auth_token)
        setUser(user_session)
        navigate('/home')
    } 

    return <AuthContext.Provider
        value={{
            isLogged,
            user,
            onLogin,
            onLogout,
        }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider