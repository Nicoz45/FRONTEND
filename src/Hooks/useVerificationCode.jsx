import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendVerificationCode, verifyCode } from '../services/verification.service'
import useFetch from './useFetch'

const useVerificationCode = () => {
    const navigate = useNavigate()
    const [code, setCode] = useState(['', '', '', '', '', ''])
    const [timer, setTimer] = useState(600)
    const [canResend, setCanResend] = useState(false)

    const {response: sendResponse, loading: sendLoading, error: sendError, sendRequest: sendCode} = useFetch()
    const {response: verifyResponse, loading: verifyLoading, error: verifyError, sendRequest: verifyCodeRequest} = useFetch()

    //Enviamos el codigo al inicializar
    const initializeVerification = () => {
        sendCode(() => sendVerificationCode())
    }

    //Aca gestionamos el temporizador 
    useEffect(() => {
        if(timer > 0){
            const interval = setInterval(() => {
                setTimer(prev => prev - 1)
            }, 1000)
            return () => clearInterval(interval)
        }
        else{
            setCanResend(true)
        }
    }, [timer])

    //Verificamos si el codigo fue validado correctamente
    useEffect(() => {
        if(verifyResponse && verifyResponse.ok){
            navigate('/create-workspace')
        }
    }, [verifyResponse, navigate])

    //Manejamos el cambio en un imput individual
    const handleInputChange = (index, value) => {
        if(value.length > 1) return 

        const new_code = [...code]
        new_code[index] = value.toUpperCase()
        setCode(new_code)

        // Auto focus al siguiente input
        if(value && index < 5){
            const next_input = document.getElementById(`code-input-${index + 1}`)
            if (next_input) next_input.focus()
        }
    }

    //Manejar la tecla de borrar (backspace)
    const handleKeyDown = (index, e) => {
        if(e.key === 'Backspace' && !code[index] && index > 0){
            const prev_input = document.getElementById(`code-input-${index - 1}`)
            if(prev_input) prev_input.focus()
        }
    }

    //Manejar el pegado del codigo completo
    const handlePaste = (e) => {
        e.preventDefault()
        const pasted_data = e.clipboardData.getData('text').toUpperCase().slice(0, 6)
        const new_code = pasted_data.split('').concat(Array(6 - pasted_data.length).fill(''))
        setCode(new_code)
    }

    // Verificamos el codigo
    const handleVerify = () => {
        const full_code = code.join('')
        if(full_code.length !== 6 ){
            return {succes: false, 
                message: 'Por favor ingresa el codigo completo'
            }
        }
        verifyCodeRequest(() => verifyCode(full_code))
        return {succes: true}
    }

    //Reenviar el codigo
    const handleResend = () => {
        setCode(['', '', '', '', '', ''])
        setTimer(600)
        setCanResend(false)
        sendCode(() => sendVerificationCode())
    }

    //Formateat el tiempo
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    //verificamos si el codigo esta completo
    const is_code_complete = code.join('').length === 6

    return {
        code,
        timer,
        canResend,
        is_code_complete,

        sendResponse,
        sendLoading,
        sendError,
        verifyResponse,
        verifyLoading,
        verifyError,

        initializeVerification,
        handleInputChange,
        handleKeyDown,
        handlePaste,
        handleVerify,
        handleResend,
        formatTime
    }
}

export default useVerificationCode