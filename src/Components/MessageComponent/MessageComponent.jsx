import React from 'react'
import '../../styles/messageComponent.css'

const MessageComponent = ({ message, isOwnMessage }) => {
    const formatTime = (timestamp) => {
        const date = new Date(timestamp)
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp)
        const today = new Date()
        
        // Si es hoy
        if (date.toDateString() === today.toDateString()) {
            return 'Hoy'
        }
        
        // Si es ayer
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        if (date.toDateString() === yesterday.toDateString()) {
            return 'Ayer'
        }
        
        // Si es otra fecha
        return date.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'long',
            year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
        })
    }

    return (
        <div className={`message-item ${isOwnMessage ? 'own-message' : ''}`}>
            <div className="message-avatar">
                {message.user_name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="message-content">
                <div className="message-header">
                    <span className="message-author">{message.user_name || 'Usuario'}</span>
                    <span className="message-time" title={formatDate(message.created_at)}>
                        {formatTime(message.created_at)}
                    </span>
                </div>
                <div className="message-text">
                    {message.message_content}
                </div>
            </div>
        </div>
    )
}

export default MessageComponent