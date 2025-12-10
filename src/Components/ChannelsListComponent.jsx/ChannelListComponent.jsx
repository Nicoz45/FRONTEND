import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../styles/channelListComponent.css'
import useFetch from '../../Hooks/useFetch'
import { createChannel } from '../../services/channels.service'

const ChannelListComponent = ({ workspace, channels, selectedChannel, onChannelSelect, onChannelCreated }) => {
    const { workspace_id } = useParams()
    const [showCreateChannel, setShowCreateChannel] = useState(false)
    const [newChannelName, setNewChannelName] = useState('')
    const { sendRequest, loading, error } = useFetch()

    const handleCreateChannel = async (e) => {
        e.preventDefault()
        if (newChannelName.trim()) {
            try {
                await sendRequest(() => createChannel(workspace_id, newChannelName.trim()))
                setNewChannelName('')
                setShowCreateChannel(false)
                // Notificar al componente padre que se creó un canal
                if (onChannelCreated) {
                    onChannelCreated()
                }
            } catch (err) {
                console.error('Error al crear canal:', err)
                alert('Error al crear el canal. Por favor, intenta de nuevo.')
            }
        }
    }

    return (
        <aside className='general-aside-container'>
            <div className='workspace-sidebar'>
                {/* Header del workspace */}
                <div className='workspace-header'>
                    <h2 className='workspace-name'>{workspace?.name || 'Workspace'}</h2>
                    <button className='workspace-options-btn'>⚙️</button>
                </div>

                {/* Sección de canales */}
                <div className='channels-section'>
                    <div className='section-header'>
                        <span className='section-title'>Canales</span>
                        <button 
                            className='add-channel-btn'
                            onClick={() => setShowCreateChannel(!showCreateChannel)}
                            title="Agregar canal"
                        >
                            +
                        </button>
                    </div>

                    {/* Formulario para crear canal */}
                    {showCreateChannel && (
                        <form className='create-channel-form' onSubmit={handleCreateChannel}>
                            <input
                                type="text"
                                placeholder="nombre-del-canal"
                                value={newChannelName}
                                onChange={(e) => setNewChannelName(e.target.value)}
                                className='channel-name-input'
                                autoFocus
                                disabled={loading}
                            />
                            {error && <span className='error-message-channel'>{error}</span>}
                            <div className='form-buttons'>
                                <button 
                                    type="submit" 
                                    className='btn-create'
                                    disabled={loading || !newChannelName.trim()}
                                >
                                    {loading ? 'Creando...' : 'Crear'}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        setShowCreateChannel(false)
                                        setNewChannelName('')
                                    }}
                                    className='btn-cancel'
                                    disabled={loading}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Lista de canales */}
                    <div className='channels-list'>
                        {channels && channels.length > 0 ? (
                            channels.map((channel) => (
                                <div
                                    key={channel._id}
                                    className={`channel-item ${selectedChannel?._id === channel._id ? 'selected' : ''}`}
                                    onClick={() => onChannelSelect(channel)}
                                >
                                    <span className='channel-hash'>#</span>
                                    <span className='channel-name'>{channel.name}</span>
                                </div>
                            ))
                        ) : (
                            <div className='no-channels'>
                                <p>No hay canales aún</p>
                                <button 
                                    className='create-first-channel-btn'
                                    onClick={() => setShowCreateChannel(true)}
                                >
                                    Crear el primero
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sección de mensajes directos */}
                <div className='direct-messages-section'>
                    <div className='section-header'>
                        <span className='section-title'>Mensajes directos</span>
                        <button className='add-dm-btn' title="Nuevo mensaje">+</button>
                    </div>
                    <div className='dm-list'>
                        <p className='coming-soon'>Próximamente...</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default ChannelListComponent