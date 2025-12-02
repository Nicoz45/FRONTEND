import React, { useState, useForm } from "react"

const useFetch = () => {
    //Cada vez que nosotros hagamos un fetch vamos a necesitar estos tres estados, para menejar una consulta al servidor
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    async function sendRequest(requestCallback){
        setError(null)
        setLoading(true)
        try{
            const res = await requestCallback()
            if(!res.ok){
                throw new Error(res.message || 'Error en la solicitud')
            }
            setResponse(res)    
        }
        catch(err){
            setError(err.message)
        }
        finally{
            setLoading(false)
        }
    }

    function resetResponse(){
        setResponse(null)
    }
    
    return{
        response,
        loading,
        error,
        sendRequest,
        resetResponse
    }
}

export default useFetch