import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
import { getWorkspaceById } from '../../services/workspace.service'
import '../../styles/workspaceScreen.css'
import ChannelListComponent from '../../Components/ChannelsListComponent.jsx/ChannelListComponent'

function WorkspaceScreen() {
    const { workspace_id } = useParams()
    const { sendRequest, response, loading, error} = useFetch()

    useEffect(() => {
        sendRequest(() => getWorkspaceById(workspace_id))
    }, [workspace_id])
    if (loading) {
        return <div>Cargando workspace...</div>
    }

    if (error) {
        console.error('Error al cargar el workspace:', error)
        return <div>Error al cargar el workspace: {error.message}</div>
    }
    const workspace_detail = response?.data?.workspace_detail
    return (
        <div className='general-workspace-container'>
            <header className='tool-bar-general-container'>
                <div className='tool-bar'>
                    <div className='tool-bar-search'>
                        <form action="search" className='search-toolbar'>
                            <input className='search-input' type="search" placeholder={`Buscar en el workspace de ${workspace_detail?.name}`} />
                            <label htmlFor="Buscar"></label>
                        </form>
                    </div>
                </div>
            </header>
            <div className='main-aside-container'>
                <ChannelListComponent />
                <main className='workspace-main'>
                    <div className="welcome-message">
                        <h1>Bienvenido a {workspace_detail?.name}</h1>
                    </div>
                </main>
            </div>

        </div>
    )
}

export default WorkspaceScreen