import React from 'react'
import { forgotPassword } from '../../services/authService'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import { Link } from 'react-router'
import '../../styles/forgotPassword.css'
import '../../styles/index.css'

const ForgotPasswordScreen = () => {
    const FORGOT_PASSWORD_FORM_FIELDS = {
        EMAIL: 'email'
    }
    const initial_form_state = {
        [FORGOT_PASSWORD_FORM_FIELDS.EMAIL]: ''
    }

    const { response, loading, error, sendRequest, resetResponse } = useFetch()

    const handleForgotPassword = (form_state_sent) => {
        sendRequest(() => {
            return forgotPassword(form_state_sent[FORGOT_PASSWORD_FORM_FIELDS.EMAIL])
        })
    }

    const { form_State, onInputChange, handleSubmit, resetForm } = useForm(initial_form_state, handleForgotPassword)


    return (
        <div className='forgot-password-general-container'>
            <header className='forgot-password-header-container'>
                <div className='logo-container'>
                    <img src="https://a.slack-edge.com/bv1-13/slack_logo-e971fd7.svg" alt="slack-logo" style={{ width: '100px' }} />
                </div>
            </header>
            <main className='general-forgot-password-form-container'>
                <div className="tittle-and-paragraph-container">
                    <h1 className="forgot-tittle">Recuperar contraseña</h1>
                    <p className="forgot-text">Ingresa tu correo electronico para recuperar tu contraseña</p>
                </div>
                <form onSubmit={handleSubmit} className="forgot-password-form-container">
                    <div className='form-inputs'>
                        <input type="text" className="input-text"
                            name={FORGOT_PASSWORD_FORM_FIELDS.EMAIL}
                            value={form_State[FORGOT_PASSWORD_FORM_FIELDS.EMAIL]}
                            id='Email'
                            onChange={onInputChange}
                            required />
                        <label htmlFor="Email" className='label-text'>Email</label>
                    </div>
                    {error && <span className='error-message'>{error}</span>}
                    {response && response.ok && (
                        <div className='success-message'>
                            <p>¡Correo enviado exitosamente!</p>
                            <p>Revisa tu bandeja de entrada para recuperar la contraseña</p>
                        </div>
                    )}
                    {loading ? (
                        <button type='submit' className='button-submit' disabled>Enviando correo...</button>
                    ) : (
                        <button type='submit' className='button-submit'>Enviar enlace de recuperacion</button>
                    )}
                    <div className="back-to-login">
                        <Link to='/login' className='back-to-login-link'>Volver al inicio de sesion</Link>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default ForgotPasswordScreen