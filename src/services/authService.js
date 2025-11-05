export async function register(username, email, password) {
    try {
        const body = { name: username, email, password }
        //Fetch es una funcion nativa de JS para hacer consultas HTTP
        const res_http = await fetch('http://localhost:8080/api/auth/register',
            {
                method: 'POST',
                headers: {
                    // Indica a mi aplicacion que voy a mandar un JSON por body.
                    'Content-Type': 'application/json'
                },
                // Transformo el objeto de JS a JSON (texto).
                body: JSON.stringify(body)
            }
        )
        //Transformo la respuesta de la API a un objeto de JS
        const response = await res_http.json()
        return response
    }
    catch (error) {
        console.error('Error al registrar', error)
        throw new Error('Error interno en el servidor')
    }
}

export async function login(email, password){
    try{
        const body = {email, password}
        const res_http = await fetch('http://localhost:8080/api/auth/login',
        { method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    )
        const response = await res_http.json()
        return response
    }
    catch(error){
        console.error('Error al registrar', error)
        throw new Error('Error interno en el servidor')
    }
    
}
