import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import useFetch from '../../Hooks/useFetch'
import { getWorkspaceById } from '../../services/workspace.service'

function WorkspaceScreen() {
    const {workspace_id} = useParams()
    const {sendRequest, response, loading, error} = useFetch()

    useEffect(() => {
        sendRequest(() => getWorkspaceById(workspace_id))
    }, [workspace_id])

    if (loading) {
        return <div>Cargando workspace...</div>
    }

    if (error) {
        return <div>Error al cargar el workspace: {error.message}</div>
    }

    return (
        <div>
            <main className='workspace-main'>
                <div className="welcome-message">
                    <h1>Bienvenido a {response?.data?.workspace_detail?.name}</h1>
                </div>
            </main>
        </div>
    )
}

export default WorkspaceScreen