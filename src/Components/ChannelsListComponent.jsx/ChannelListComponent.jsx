import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../styles/channelListComponent.css'
import useFetch from '../../Hooks/useFetch'
import { createChannel, updateChannel, deleteChannel } from '../../services/channels.service'
import ICONS from '../../constants/Icons'

const ChannelListComponent = ({ workspace, channels, selectedChannel, onChannelSelect, onChannelCreated }) => {
    const { workspace_id } = useParams()
    const [showCreateChannel, setShowCreateChannel] = useState(false)
    const [newChannelName, setNewChannelName] = useState('')
    const [editingChannel, setEditingChannel] = useState(null)
    const [editChannelName, setEditChannelName] = useState('')
    const [showChannelOptions, setShowChannelOptions] = useState(null)
    const { sendRequest, loading, error } = useFetch()

    const handleCreateChannel = async (e) => {
        e.preventDefault()
        if (newChannelName.trim()) {
            try {
                await sendRequest(() => createChannel(workspace_id, newChannelName.trim()))
                setNewChannelName('')
                setShowCreateChannel(false)
                if (onChannelCreated) {
                    onChannelCreated()
                }
            } catch (err) {
                alert('Error al crear el canal. Por favor, intenta de nuevo.')
            }
        }
    }

    const handleStartEdit = (channel, e) => {
        e.stopPropagation()
        setEditingChannel(channel._id)
        setEditChannelName(channel.name)
        setShowChannelOptions(null)
    }

    const handleCancelEdit = () => {
        setEditingChannel(null)
        setEditChannelName('')
    }

    const handleUpdateChannel = async (channel_id) => {
        if (editChannelName.trim() && editChannelName !== channels.find(c => c._id === channel_id)?.name) {
            try {
                await sendRequest(() => updateChannel(workspace_id, channel_id, editChannelName.trim()))
                setEditingChannel(null)
                setEditChannelName('')
                if (onChannelCreated) {
                    onChannelCreated()
                }
            } catch (err) {
                alert('Error al actualizar el canal: ' + (err.message || 'Error desconocido'))
            }
        } else {
            handleCancelEdit()
        }
    }

    const handleDeleteChannel = async (channel_id, channel_name, e) => {
        e.stopPropagation()
        if (window.confirm(`¿Estás seguro de que quieres eliminar el canal #${channel_name} ?`)) {
            try {
                await sendRequest(() => deleteChannel(workspace_id, channel_id))
                setShowChannelOptions(null)

                // Si estamos eliminando el canal seleccionado, limpiar la selección
                if (selectedChannel?._id === channel_id) {
                    onChannelSelect(null)
                }

                if (onChannelCreated) {
                    onChannelCreated()
                }
            } catch (err) {
                alert('Error al eliminar el canal: ' + (err.message || 'Error desconocido'))
            }
        }
    }

    const toggleChannelOptions = (channel_id, e) => {
        e.stopPropagation()
        setShowChannelOptions(showChannelOptions === channel_id ? null : channel_id)
    }

    return (
        <aside className='general-aside-container'>
            <div className='workspace-sidebar'>
                {/* Header del workspace */}
                <div className='workspace-header'>
                    <h2 className='workspace-name'>{workspace?.name || 'Workspace'}</h2>
                    <button className='workspace-options-btn'><ICONS.ArrowDown /></button>
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
                                <div key={channel._id} className='channel-item-wrapper'>
                                    {editingChannel === channel._id ? (
                                        <div className='channel-edit-form'>
                                            <input
                                                type="text"
                                                value={editChannelName}
                                                onChange={(e) => setEditChannelName(e.target.value)}
                                                className='channel-edit-input'
                                                autoFocus
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault()
                                                        handleUpdateChannel(channel._id)
                                                    }
                                                }}
                                            />
                                            <div className='channel-edit-buttons'>
                                                <button
                                                    onClick={() => handleUpdateChannel(channel._id)}
                                                    className='btn-save-edit'
                                                    disabled={loading}
                                                >
                                                    ✓
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className='btn-cancel-edit'
                                                    disabled={loading}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className={`channel-item ${selectedChannel?._id === channel._id ? 'selected' : ''}`}
                                            onClick={() => onChannelSelect(channel)}
                                        >
                                            <div>
                                                <span className='channel-hash'>#</span>
                                                <span className='channel-name'>{channel.name}</span>
                                            </div>

                                            <button
                                                className='channel-options-btn'
                                                onClick={(e) => toggleChannelOptions(channel._id, e)}
                                                title="Opciones del canal"
                                            >
                                                <ICONS.DotsVertical />
                                            </button>

                                            {showChannelOptions === channel._id && (
                                                <div className='channel-options-menu'>
                                                    <button
                                                        onClick={(e) => handleStartEdit(channel, e)}
                                                        className='channel-option-item'
                                                    >
                                                        ✏ Editar
                                                    </button>
                                                    <button
                                                        onClick={(e) => handleDeleteChannel(channel._id, channel.name, e)}
                                                        className='channel-option-item delete'
                                                    >
                                                        🗑 Eliminar
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
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
        </aside >
    )
}

export default ChannelListComponent