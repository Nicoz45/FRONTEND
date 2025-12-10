import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
import { getWorkspaceById } from '../../services/workspace.service'
import { AuthContext } from '../../Context/AuthContext'
import '../../styles/workspaceScreen.css'
import ChannelListComponent from '../../Components/ChannelsListComponent.jsx/ChannelListComponent'

function WorkspaceScreen() {
    const { workspace_id } = useParams()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const { sendRequest, response, loading, error } = useFetch()
    const [selectedChannel, setSelectedChannel] = useState(null)

    useEffect(() => {
        sendRequest(() => getWorkspaceById(workspace_id))
    }, [workspace_id])

    useEffect(() => {
        if (response?.data?.channels && response.data.channels.length > 0) {
            // Seleccionar el primer canal por defecto
            setSelectedChannel(response.data.channels[0])
        }
    }, [response])

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Cargando workspace...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>Error al cargar el workspace</h2>
                <p>{error}</p>
                <button onClick={() => navigate('/home')}>Volver al inicio</button>
            </div>
        )
    }

    const workspace_detail = response?.data?.workspace_detail
    const channels = response?.data?.channels || []

    const handleChannelSelect = (channel) => {
        setSelectedChannel(channel)
    }

    return (
        <div className='general-workspace-container'>
            <header className='tool-bar-general-container'>
                <div className='tool-bar'>
                    <div className='tool-bar-left'>
                        <button 
                            className='back-button'
                            onClick={() => navigate('/home')}
                        >
                            ← Volver
                        </button>
                    </div>
                    <div className='tool-bar-search'>
                        <form className='search-toolbar'>
                            <input 
                                className='search-input' 
                                type="search" 
                                placeholder={`Buscar en ${workspace_detail?.name || 'workspace'}`} 
                            />
                        </form>
                    </div>
                    <div className='tool-bar-right'>
                        <div className='user-info'>
                            <span>{user?.name}</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className='main-aside-container'>
                <ChannelListComponent 
                    workspace={workspace_detail}
                    channels={channels}
                    selectedChannel={selectedChannel}
                    onChannelSelect={handleChannelSelect}
                />
                
                <main className='workspace-main'>
                    {selectedChannel ? (
                        <div className="channel-view">
                            <div className="channel-header">
                                <h2># {selectedChannel.name}</h2>
                                <p>{channels.length} miembros</p>
                            </div>
                            <div className="messages-container">
                                <div className="welcome-message">
                                    <h3>Bienvenido a #{selectedChannel.name}</h3>
                                    <p>Este es el inicio del canal #{selectedChannel.name}</p>
                                </div>
                            </div>
                            <div className="message-input-container">
                                <input 
                                    type="text" 
                                    placeholder={`Mensaje a #${selectedChannel.name}`}
                                    className="message-input"
                                />
                                <button className="send-button">Enviar</button>
                            </div>
                        </div>
                    ) : (
                        <div className="no-channel-selected">
                            <h2>Selecciona un canal para comenzar</h2>
                            <p>Elige un canal de la lista de la izquierda</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default WorkspaceScreen