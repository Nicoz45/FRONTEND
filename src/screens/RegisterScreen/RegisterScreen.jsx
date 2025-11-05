import React from 'react'
import '../../styles/registerScreen.css'
import useForm from '../../Hooks/useForm.jsx'
import { register } from '../../services/authService.js'
import useFetch from '../../Hooks/useFetch.jsx'

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


    // Como useForm me retorna un objeto, uso destructuring para sacar lo que necesito
    const { form_State, onInputChange, handleSubmit, resetForm } = useForm(initial_form_state, onRegister)

    /* register('nicolas', 'zaratenico52@gmail.com', 'Nicolatesla546') */
    return (
        <div className='general-form-container'>
            <h1 className='title'>Registrarse</h1>
            <form onSubmit={handleSubmit} className='form-container'>
                <div className='form-field'>
                    <label htmlFor="username">Nombre de usuario</label>
                    <input className='input-text' type="text" placeholder='pepe'
                        value={form_State[REGISTER_FORM_FIELDS.USERNAME]}
                        name={REGISTER_FORM_FIELDS.USERNAME}
                        id='username'
                        onChange={onInputChange}
                    />
                </div>
                <div className='form-field'>
                    <label htmlFor="email">Email:</label>
                    <input className='input-text' type="text" placeholder='pepe@gmail.com'
                        value={form_State[REGISTER_FORM_FIELDS.EMAIL]}
                        name={REGISTER_FORM_FIELDS.EMAIL}
                        id='email'
                        onChange={onInputChange} />
                </div>
                <div className='form-field'>
                    <label htmlFor="password">Contraseña</label>
                    <input className='input-text' type="password" placeholder='pepe-1234'
                        value={form_State[REGISTER_FORM_FIELDS.PASSWORD]}
                        name={REGISTER_FORM_FIELDS.PASSWORD}
                        id='password'
                        onChange={onInputChange} />
                </div>
                {error && <span style={{ color: 'red' }}>{error}</span>}
                {response && <span style={{ color: 'green' }}>Usuario registrado con exito!</span>}
                {
                    loading
                        ? <button disabled>Registrando...</button>
                        : <button className='button-register'>Registrarse</button>
                }
            </form>
        </div>
    )
}

export default RegisterScreen