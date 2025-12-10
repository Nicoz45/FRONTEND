import ENVIRONMENT from "../config/environment.config";

export async function createChannel(workspace_id, name) {
    try {
        const response_http = await fetch(
            ENVIRONMENT.VITE_API_URL + `/api/workspace/${workspace_id}/channels`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name })
            }
        )

        if (!response_http.ok) {
            const errorData = await response_http.json()
            throw new Error(errorData.message || 'Error al crear el canal')
        }

        const response = await response_http.json()
        return response
    } catch (error) {
        throw error
    }
}

export async function getChannelMessages(workspace_id, channel_id) {
    try {
        const response_http = await fetch(
            ENVIRONMENT.VITE_API_URL + `/api/workspace/${workspace_id}/channels/${channel_id}/messages`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            }
        )

        if (!response_http.ok) {
            const errorData = await response_http.json()
            throw new Error(errorData.message || 'Error al obtener mensajes')
        }

        const response = await response_http.json()
        return response
    } catch (error) {
        throw error
    }
}

export async function sendMessage(workspace_id, channel_id, content) {
    try {
        const response_http = await fetch(
            ENVIRONMENT.VITE_API_URL + `/api/workspace/${workspace_id}/channels/${channel_id}/messages`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content })
            }
        )

        if (!response_http.ok) {
            const errorData = await response_http.json()
            throw new Error(errorData.message || 'Error al enviar mensaje')
        }

        const response = await response_http.json()
        return response
    } catch (error) {
        throw error
    }
}

export async function deleteChannel(workspace_id, channel_id) {
    try {
        const response_http = await fetch(
            ENVIRONMENT.VITE_API_URL + `/api/workspace/${workspace_id}/channels/${channel_id}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            }
        )

        if (!response_http.ok) {
            const errorData = await response_http.json()
            throw new Error(errorData.message || 'Error al eliminar el canal')
        }

        const response = await response_http.json()
        return response
    } catch (error) {
        throw error
    }
}

export async function updateChannel(workspace_id, channel_id, name) {
    try {
        const response_http = await fetch(
            ENVIRONMENT.VITE_API_URL + `/api/workspace/${workspace_id}/channels/${channel_id}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name })
            }
        )

        if (!response_http.ok) {
            const errorData = await response_http.json()
            throw new Error(errorData.message || 'Error al actualizar el canal')
        }

        const response = await response_http.json()
        return response
    } catch (error) {
        throw error
    }
}