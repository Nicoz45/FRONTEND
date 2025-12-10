import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
import { getWorkspaceById } from '../../services/workspace.service'
import { AuthContext } from '../../Context/AuthContext'
import '../../styles/workspaceScreen.css'
import ChannelListComponent from '../../Components/ChannelsListComponent.jsx/ChannelListComponent'
import useChannel from '../../Hooks/useChannels'
import MessageComponent from '../../Components/MessageComponent/MessageComponent'

function WorkspaceScreen() {
    const { workspace_id } = useParams()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const { sendRequest, response, loading, error } = useFetch()
    const [selectedChannel, setSelectedChannel] = useState(null)
    
    const {
        messages,
        messagesLoading,
        messageInput,
        handleSendMessage,
        handleMessageInputChange,
        handleKeyPress
    } = useChannel(workspace_id, selectedChannel?._id)

    useEffect(() => {
        sendRequest(() => getWorkspaceById(workspace_id))
    }, [workspace_id])

    useEffect(() => {
        if (response?.data?.channels && response.data.channels.length > 0 && !selectedChannel) {
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

    const handleChannelCreated = () => {
        // Recargar la información del workspace para obtener los canales actualizados
        sendRequest(() => getWorkspaceById(workspace_id))
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
                    onChannelCreated={handleChannelCreated}
                />
                
                <main className='workspace-main'>
                    {selectedChannel ? (
                        <div className="channel-view">
                            <div className="channel-header">
                                <h2># {selectedChannel.name}</h2>
                                <p>{channels.length} miembros</p>
                            </div>
                            
                            <div className="messages-container">
                                {messagesLoading ? (
                                    <div className="messages-loading">
                                        <div className="messages-loading-spinner"></div>
                                        <p>Cargando mensajes...</p>
                                    </div>
                                ) : messages.length === 0 ? (
                                    <div className="welcome-message">
                                        <h3>Bienvenido a #{selectedChannel.name}</h3>
                                        <p>Este es el inicio del canal #{selectedChannel.name}</p>
                                        <p>Sé el primero en enviar un mensaje aquí.</p>
                                    </div>
                                ) : (
                                    <div className="messages-list">
                                        {messages.map((message) => (
                                            <MessageComponent
                                                key={message._id}
                                                message={message}
                                                isOwnMessage={message.member_id === user?.id}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            <div className="message-input-container">
                                <input 
                                    type="text" 
                                    placeholder={`Mensaje a #${selectedChannel.name}`}
                                    className="message-input"
                                    value={messageInput}
                                    onChange={handleMessageInputChange}
                                    onKeyPress={handleKeyPress}
                                />
                                <button 
                                    className="send-button"
                                    onClick={handleSendMessage}
                                    disabled={!messageInput.trim()}
                                >
                                    Enviar
                                </button>
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

/* Estilos CSS a agregar/actualizar en workspaceScreen.css */