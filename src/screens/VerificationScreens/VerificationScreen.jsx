import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import useVerificationCode from '../../Hooks/useVerificationCode'
import '../../styles/verificationScreen.css'


const VerificationCodeScreen = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    const {
        code,
        timer,
        canResend,
        isCodeComplete,

        sendResponse,
        sendLoading,
        sendError,
        verifyLoading,
        verifyError,

        initializeVerification,
        handleInputChange,
        handleKeyDown,
        handlePaste,
        handleVerify,
        handleResend,
        formatTime
    } = useVerificationCode()

    useEffect(() => {
        initializeVerification()
    }, [])

    const onVerifyClick = () => {
        const result = handleVerify()
        if (!result.succes) {
            alert(result.message)
        }
    }

    return (
        <div className='verification-code-container'>
            <header className='header-logo-container'>
                <div className='logo-container'>
                    <img src="https://a.slack-edge.com/bv1-13/slack_logo-e971fd7.svg" alt="slack-logo" style={{ width: '100px' }} />
                </div>
            </header>
            <div className='verification-card'>
                <div className='verification-header'>
                    <h1>Verificación de Código</h1>
                    <p>Hemos enviado un código de <span className='code-length letter-color'>6</span> dígitos a</p>
                    <p className='user-email letter-color'>{user?.email}</p>
                </div>
                <div className='code-input-container'>
                    {code.map((digit, index) => (
                        <input
                        key={index}
                        id={`code-input-${index}`}
                        type='text'
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className='code-input'
                        autoFocus={index === 0}
                        />
                    ))}
                </div>
                    {sendError && <div className='error-message'>{sendError}</div>}
                    {sendResponse && sendResponse.ok && (
                        <div className='success-message'>Código enviado correctamente</div>
                    )}
                {verifyError && <div className='error-message'>{verifyError}</div>}
                <button
                    className='verify-button button-style'
                    onClick={onVerifyClick}
                    /* disabled={verifyLoading || !isCodeComplete} */
                >
                    {verifyLoading ? 'Verificando...' : 'Verificar Código'}
                </button>
                <div className='timer-container'>
                    {!canResend ? (
                        <p>El código expira en: <span className='timer'>{formatTime(timer)}</span></p>
                    ) : (
                        <button
                            className='resend-button button-style'
                            onClick={handleResend}
                            disabled={sendLoading}
                        >
                            {sendLoading ? 'Enviando...' : 'Reenviar código'}
                        </button>
                    )}
                </div>
                <button
                    className='back-button'
                    onClick={() => navigate('/home')}>
                    Volver al inicio
                </button>
            </div>
        </div>
    )
}

export default VerificationCodeScreen