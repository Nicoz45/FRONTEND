import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from './useFetch'
import { createWorkspace } from '../services/workspace.service'
import useForm from './useForm'

const useCreateWorkspace = () => {
    const navigate = useNavigate()
    const CREATE_WORKSPACE_FIELDS = {
        NAME: 'name',
        URL_IMAGE: 'url_image'
    }

    const initial_form_state = {
        [CREATE_WORKSPACE_FIELDS.NAME]: '',
        [CREATE_WORKSPACE_FIELDS.URL_IMAGE]: ''
    }

    const { response, loading, error, sendRequest } = useFetch()

    const handleCreatedWorkspace = (form_state_sent) => {
        const name = form_state_sent[CREATE_WORKSPACE_FIELDS.NAME]
        const url_image = form_state_sent[CREATE_WORKSPACE_FIELDS.URL_IMAGE]

        if (!name || name.trim().length === 0) {
            return { success: false, message: 'El nombre del workspace es requerido' }
        }

        sendRequest(() => createWorkspace(name, url_image))
        return { success: true }
    }

    const form_hook = useForm(initial_form_state, handleCreatedWorkspace)

    useEffect(() => {
        if(response && response.ok){
            navigate('/home')
        }
    }, [response, navigate])


    return {
        formState: form_hook.form_State,
        onInputChange: form_hook.onInputChange,
        handleSubmit: form_hook.handleSubmit,
        resetForm: form_hook.resetForm,

        response,
        loading,
        error,

        CREATE_WORKSPACE_FIELDS
    }
}

export default useCreateWorkspace