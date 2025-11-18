import ENVIRONMENT from "../config/environment.config";

async function getWorkspaces (){
    const response_http = await fetch(
        ENVIRONMENT.VITE_API_URL + '/api/workspace',
        {
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        }
    )
    if(!response_http){
        throw new Error('Error al obtener la lista de workspaces')
    }
    const response = await response_http.json()
    return response
}

export default getWorkspaces
