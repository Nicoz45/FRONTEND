import { useState, useEffect } from 'react'
import useFetch from './useFetch'
import { createChannel, getChannelMessages, sendMessage } from '../services/channels.service'

const useChannel = (workspace_id, channel_id) => {
    const [messages, setMessages] = useState([])
    const [messageInput, setMessageInput] = useState('')
    
    const {
        response: messagesResponse,
        loading: messagesLoading,
        error: messagesError,
        sendRequest: fetchMessages
    } = useFetch()

    const {
        response: sendMessageResponse,
        loading: sendingMessage,
        error: sendMessageError,
        sendRequest: sendMessageRequest
    } = useFetch()

    // Cargar mensajes cuando cambia el canal
    useEffect(() => {
        if (workspace_id && channel_id) {
            fetchMessages(() => getChannelMessages(workspace_id, channel_id))
        }
    }, [workspace_id, channel_id])

    // Actualizar mensajes cuando llega la respuesta
    useEffect(() => {
        if (messagesResponse && messagesResponse.ok) {
            setMessages(messagesResponse.data.messages || [])
        }
    }, [messagesResponse])

    // Actualizar mensajes después de enviar uno nuevo
    useEffect(() => {
        if (sendMessageResponse && sendMessageResponse.ok) {
            setMessages(sendMessageResponse.data.messages || [])
            setMessageInput('')
        }
    }, [sendMessageResponse])

    const handleSendMessage = () => {
        if (messageInput.trim() && workspace_id && channel_id) {
            sendMessageRequest(() => 
                sendMessage(workspace_id, channel_id, messageInput.trim())
            )
        }
    }

    const handleMessageInputChange = (e) => {
        setMessageInput(e.target.value)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return {
        messages,
        messagesLoading,
        messagesError,
        messageInput,
        sendingMessage,
        sendMessageError,
        handleSendMessage,
        handleMessageInputChange,
        handleKeyPress,
        refreshMessages: () => fetchMessages(() => getChannelMessages(workspace_id, channel_id))
    }
}

export default useChannel