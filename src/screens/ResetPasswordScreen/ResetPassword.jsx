import React, { useEffect } from 'react'
import useFetch from '../../Hooks/useFetch'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../../services/authService'
import useForm from '../../Hooks/useForm'
import '../../styles/resetPasswordScreen.css'

const ResetPasswordScreen = () => {
    const { token } = useParams()
    const navigate = useNavigate()

    const RESET_PASSWORD_FORM_FIELDS = {
        PASSWORD: 'password',
        CONFIRM_PASSWORD: 'confirmPassword'
    }

    const initial_form_state = {
        [RESET_PASSWORD_FORM_FIELDS.PASSWORD]: '',
        [RESET_PASSWORD_FORM_FIELDS.CONFIRM_PASSWORD]: ''
    }

    const { sendRequest, response, loading, error, resetResponse } = useFetch()
    const handleResetPassword = (form_state_sent) => {
        const password = form_state_sent[RESET_PASSWORD_FORM_FIELDS.PASSWORD]
        const confirmPassword = form_state_sent[RESET_PASSWORD_FORM_FIELDS.CONFIRM_PASSWORD]

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden')
            return
        }

        if (password.Length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres')
            return
        }

        sendRequest(() => {
            return resetPassword(token, password)
        })
    }

    const { form_State, onInputChange, handleSubmit, resetForm } = useForm(initial_form_state, handleResetPassword)

    useEffect(() => {
        if (response && response.ok) {
            alert('Contraseña actualizada con exito')
            setTimeout(() => {
                navigate('/login')
            })
        }
    }, [response, navigate])

    return (
        <div className='reset-password-general-container'>
            <header>
                <div className='reset-password-logo-container'>
                    <img src="https://a.slack-edge.com/bv1-13/slack_logo-e971fd7.svg" alt="slack-logo" style={{ width: '100px' }} />
                </div>
            </header>
            <main className='general-form-reset-password-container'>
                <h1 className="reset-title">Restablecer contraseña</h1>
                <p className="reset-text">Ingresa tu nueva contraseña</p>
                <form onSubmit={handleSubmit} className="form-reset-container">
                    <div className="form-input-reset">
                        <input type="password" className="reset-password-input" 
                        value={form_State[RESET_PASSWORD_FORM_FIELDS.PASSWORD]}
                        name={RESET_PASSWORD_FORM_FIELDS.PASSWORD}
                        id='Password'
                        onChange={onInputChange}
                        required
                        minLength={6}
                        />
                        <input type="checkbox" onClick= "Password.type = this.checked ? 'text' : 'password'" />
                        <label htmlFor="Password" className="label-text">Nueva contraseña</label>
                    </div>
                    <div className="form-input-reset">
                        <input type="password" className="reset-password-input" 
                        value={form_State[RESET_PASSWORD_FORM_FIELDS.CONFIRM_PASSWORD]}
                        name={RESET_PASSWORD_FORM_FIELDS.CONFIRM_PASSWORD}
                        id='ConfirmPassword'
                        onChange={onInputChange}
                        required
                        minLength={6}
                        />
                        <input type="checkbox" onClick= "ConfirmPassword.type = this.checked ? 'text' : 'password'" />
                        <label htmlFor="ConfirmPassword" className="label-text">Confirmar contraseña</label>
                    </div>
                    {error && <span className='error-message'>{error}</span>}
                    {response && response.ok && (
                        <div>
                            <p>¡Contraseña actualizada con exito!</p>
                            <p>Seras redirigido al inicio de sesion...</p>
                        </div>
                    )}
                    {loading ? (
                        <button className='button-reset-password'disabled>Actualizando...</button>
                    ) : (
                        <button type='submit' className='button-reset-password'>Restablecer contraseña</button>
                    )}
                    <div className='back-to-login'>
                        <Link to="/login" className='back-to-login-link'><p>Regresar al inicio de sesion</p></Link>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default ResetPasswordScreen