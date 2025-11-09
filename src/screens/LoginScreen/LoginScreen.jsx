import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import useFetch from '../../Hooks/useFetch'
import { login } from '../../services/authService'
import useForm from '../../Hooks/useForm'
import '../../styles/loginScreen.css'
import { AuthContext } from '../../Context/AuthContext'

const LoginScreen = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {onLogin} = useContext(AuthContext)
    useEffect(() => {
        const query = new URLSearchParams(location.search)
        const from = query.get('from')
        if (from === 'verified_email') {
            alert('Has verificado tu email correctamente, ya puedes iniciar sesion')
        }
    }, [])
    const LOGIN_FORM_FIELDS = {
        EMAIL: 'email',
        PASSWORD: 'password'
    }

    const initial_form_state = {
        [LOGIN_FORM_FIELDS.EMAIL]: '',
        [LOGIN_FORM_FIELDS.PASSWORD]: ''
    }

    const { response, loading, error, sendRequest, resetResponse } = useFetch()

    function handleLogin(form_state_sent) {
        resetResponse()
        sendRequest(() => {
            return login(
                form_state_sent[LOGIN_FORM_FIELDS.EMAIL],
                form_state_sent[LOGIN_FORM_FIELDS.PASSWORD]
            )
        })
    }

    const { form_State, onInputChange, handleSubmit, resetForm } = useForm(initial_form_state, handleLogin)

    useEffect(
        () => {
            if (response && response.ok) {
                //Queremos que persista el token en el localStorage
                //Dejemos que el contexto se encargue de que sucedera
                onLogin(response.body.auth_token)
            }
        },
        [response]
    )

    //Si venimos de verificar el mail, mostrar la alerta de verificado.
    return (
        <div className='login-general-container'>
            <div className='left-container'>
                <div className='title-container'>
                    <h1>SGPT</h1>
                    <span>Sistema de Gestion de Proyectos y Tareas</span>
                </div>
            </div>
            <div className='general-form-login-container'>
                <h1 className='session-text'>Iniciar Sesion</h1>
                <form className='form-login-container' onSubmit={handleSubmit}>
                    <div className='form-imputs'>
                        <label htmlFor="Email">Email</label>
                        <input type="text" className='inputs'
                            value={form_State[LOGIN_FORM_FIELDS.EMAIL]}
                            name={LOGIN_FORM_FIELDS.EMAIL}
                            id='Email'
                            onChange={onInputChange} />
                    </div>
                    <div className='form-imputs'>
                        <label htmlFor="Password">Password</label>
                        <input type="password" className='inputs'
                            value={form_State[LOGIN_FORM_FIELDS.PASSWORD]}
                            name={LOGIN_FORM_FIELDS.PASSWORD}
                            id='Password'
                            onChange={onInputChange} />
                    </div>
                    {error && <span style={{ color: 'red' }}>{error}</span>}
                    {response && <span style={{ color: 'green' }}>Iniciando sesion</span>}
                    {
                        loading
                        ? <button disabled>Login...</button>
                        : <button className='button-register'>Login</button>
                    }
                    <span>No tienes una cuenta?<Link className='link-register' to='/register'>Registrarse</Link></span>
                    
                </form>
            </div>
        </div>

    )
}

export default LoginScreen