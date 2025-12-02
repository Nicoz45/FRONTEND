import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../Context/AuthContext'
import useVerificationCode from '../../Hooks/useVerificationCode'


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
            <div className='verification-card'>
                <div className='verification-header'>
                    <h1>Verificación de Código</h1>
                    <p>Hemos enviado un código de 6 dígitos a</p>
                    <p className='user-email'>{user?.email}</p>
                </div>

                {sendError && <div className='error-message'>{sendError}</div>}
                {sendResponse && sendResponse.ok && (
                    <div className='success-message'>Código enviado correctamente</div>
                )}

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

                {verifyError && <div className='error-message'>{verifyError}</div>}

                <button
                    className='verify-button'
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
                            className='resend-button'
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