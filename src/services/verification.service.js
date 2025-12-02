import ENVIRONMENT from "../config/environment.config";


export async function sendVerificationCode() {
    try {
        const res_http = await fetch(ENVIRONMENT.VITE_API_URL + '/api/verification/send-code',
            {
                method: 'POST',
                headers:{
                    'Authorization' : `Bearer ${localStorage.getItem('auth_token')}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        const response = await res_http.json()
        return response
    } catch (error) {
        console.error('Error al enviar el código de verificación', error)
        throw new Error('Error interno en el servidor')
    }
}

export async function verifyCode(code){
    try {
        const res_http = await fetch(ENVIRONMENT.VITE_API_URL + '/api/verification/verify-code',
            {
                method: 'POST',
                headers:{
                    'Authorization' : `Bearer ${localStorage.getItem('auth_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({code})
            }
        )
        const response = await res_http.json()
        return response
    } catch (error) {
        console.error('Error al verificar el código de verificación', error)
        throw new Error('Error interno en el servidor')
    }
}