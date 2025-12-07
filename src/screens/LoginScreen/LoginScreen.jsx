import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
import { login } from '../../services/authService'
import useForm from '../../Hooks/useForm'
import '../../styles/loginScreen.css'
import '../../styles/index.css'
import { AuthContext } from '../../Context/AuthContext'
import ICONS from '../../constants/Icons'

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
            <header className='header-logo-slack-container'>
                <div className='logo-slack-container'>
                    <img src="https://a.slack-edge.com/bv1-13/slack_logo-e971fd7.svg" alt="slack-logo" style={{width: '100px'}}/>
                </div>
                <div className='register-container'>
                    <span className='Register-span'>¿Es tu primera vez en Slack?</span>
                    <Link className='link-register' to='/register'>Crear una cuenta</Link>
                </div>
            </header>
            <div className='general-form-login-container'>
                <h1 className='session-text'>Escribe tu correo y contraseña para iniciar Sesion</h1>
                <form className='form-login-container' onSubmit={handleSubmit}>
                    <div className='form-inputs'>
                        <input type="text" className='input-text'
                            value={form_State[LOGIN_FORM_FIELDS.EMAIL]}
                            name={LOGIN_FORM_FIELDS.EMAIL}
                            id='Email'
                            onChange={onInputChange} />
                        <label htmlFor="Email" className='label-text'>Email</label>
                    </div>
                    <div className='form-inputs'>
                        <input type="password" className='input-text'
                            value={form_State[LOGIN_FORM_FIELDS.PASSWORD]}
                            name={LOGIN_FORM_FIELDS.PASSWORD}
                            id='Password'
                            onChange={onInputChange} />
                        <label htmlFor="Password" className='label-text'>Password</label>
                    </div>
                    {error && <span style={{ color: 'red' }}className='little-text'>{error}</span>}
                    {response && <span style={{ color: 'green' }}className='little-text'>Iniciando sesion</span>}
                    {
                        loading
                        ? <button disabled className='button-login'>Login...</button>
                        : <button className='button-login'>Login</button>
                    }
                    <div className='forgot-password-container'>
                        <span className='forgot-password'>¿Tienes problemas para iniciar sesion?</span>
                        <Link to='/forgot-password'>Recuperar contraseña</Link>
                    </div>
                </form>
            </div>
                <footer>
                    <div className='footer-links-container'>
                        <ul>
                            <li className='list-link'><a href="#">Privacidad y terminos</a></li>
                            <li className='list-link'><a href="#">Contactarnos</a></li>
                            <li className='list-link'><a href="#"><ICONS.GlobeSimple/>Cambiar region</a></li>
                        </ul>
                    </div>
                </footer>
        </div>

    )
}

export default LoginScreen