import ENVIRONMENT from "../config/environment.config";

export async function getWorkspaces (){
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

export async function getWorkspaceById(workspaces_id){
    try {
        const response_http = await fetch(
            ENVIRONMENT.VITE_API_URL + `/api/workspace/${workspaces_id}/channels`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            }
        )
        if(!response_http){
            const errorData = await response_http.json();
            throw new Error(errorData.message || 'Error al obtener el workspace')
        }
    } catch (error) {
        console.error('Error en getWorkspaceId:', error )
        throw Error
    }
}

export async function createWorkspace(name, url_image){
    const response_http = await fetch(
        ENVIRONMENT.VITE_API_URL + '/api/workspace',
        {
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, url_image})
        }
    )
    if(!response_http){
        throw new Error('Error al crear el Workspace')
    }
    const response = await response_http.json()
    return response
}

