import React from 'react'
import '../../styles/registerScreen.css'
import '../../styles/index.css'
import useForm from '../../Hooks/useForm.jsx'
import { register } from '../../services/authService.js'
import useFetch from '../../Hooks/useFetch.jsx'
import ICONS from '../../constants/Icons.jsx'
import { Link } from 'react-router-dom'

const RegisterScreen = () => {
    //Guardamos los campos que tendra nuestro form
    const REGISTER_FORM_FIELDS = {
        USERNAME: 'username',
        EMAIL: 'email',
        PASSWORD: 'password'
    }
    // Creamos el estado inicial de nuestro estado
    const initial_form_state = {
        [REGISTER_FORM_FIELDS.USERNAME]: '',
        [REGISTER_FORM_FIELDS.EMAIL]: '',
        [REGISTER_FORM_FIELDS.PASSWORD]: ''
    }

    const { response, loading, error, sendRequest } = useFetch()

    function onRegister(form_state_sent) {
        resetForm()
        sendRequest(() => {
            return register(
                form_state_sent[REGISTER_FORM_FIELDS.USERNAME],
                form_state_sent[REGISTER_FORM_FIELDS.EMAIL],
                form_state_sent[REGISTER_FORM_FIELDS.PASSWORD]
            )
        })
    }

    const handleRegistrerClick = (e) => {
        e.preventDefault()
        const { username, email, password } = form_State
        register(username, email, password)
    }

    const { form_State, onInputChange, handleSubmit, resetForm } = useForm(initial_form_state, onRegister)

    return (
        <div className='general-form-container'>
            <header className='header-logo-container'>
                <div className='logo-container'>
                    <img src="https://a.slack-edge.com/bv1-13/slack_logo-e971fd7.svg" alt="slack-logo" style={{ width: '100px' }} />
                </div>
            </header>
            <main className='title-and-form-container'>
                <h1 className='title'>Registrarse</h1>
                <div className='text-span'>
                    <p>Te sugerimos que uses la <span>direccion de correo electronico que usas en el trabajo.</span></p>
                </div>
                <form onSubmit={handleSubmit} className='form-container'>
                    <div className='form-field'>
                        <input className='input-text' type="text"
                            value={form_State[REGISTER_FORM_FIELDS.USERNAME]}
                            name={REGISTER_FORM_FIELDS.USERNAME}
                            id='username'
                            onChange={onInputChange}
                        />
                        <label htmlFor="username" className='label-text'>Nombre de usuario</label>
                    </div>
                    <div className='form-field'>
                        <input className='input-text' type="text"
                            value={form_State[REGISTER_FORM_FIELDS.EMAIL]}
                            name={REGISTER_FORM_FIELDS.EMAIL}
                            id='email'
                            onChange={onInputChange} />
                        <label htmlFor="email" className='label-text'>Email:</label>
                    </div>
                    <div className='form-field'>
                        <input className='input-text' type="password"
                            value={form_State[REGISTER_FORM_FIELDS.PASSWORD]}
                            name={REGISTER_FORM_FIELDS.PASSWORD}
                            id='password'
                            onChange={onInputChange} />
                        <label htmlFor="password" className='label-text'>Contraseña</label>
                    </div>
                    {error && <span className='error-text little-text'>{error}</span>}
                    {response && <span className='success-text little-text'>Usuario registrado con exito!</span>}
                    {
                        loading
                            ? <button className='button-register' disabled>Registrando...</button>
                            : <button className='button-register'>Registrarse</button>
                    }
                    <div className="used-slack-link-container">
                        <span>¿Ya estas usando Slack?</span>
                        <Link to='/login'>Iniciar sesion en un espacio de trabajo existente</Link>
                    </div>
                </form>
            </main>
            <footer className='footer-options-container'>
                <div className='options-container'>
                    <a href="#">Privacidad y términos</a>
                    <a href="#">Contactarnos</a>
                    <a href="#"><ICONS.GlobeSimple />Cambiar region</a>
                </div>
            </footer>
        </div>
    )
}

export default RegisterScreen