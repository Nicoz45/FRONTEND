import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useCreateWorkspace from '../../Hooks/useCreateWorkspace'
import '../../styles/CreateWorkspaceScreen.css'

const CreateWorkspaceScreen = () => {
    const navigate = useNavigate()

    const {
        formState,
        onInputChange,
        handleSubmit,
        loading,
        error,
        response,
        CREATE_WORKSPACE_FIELDS
    } = useCreateWorkspace()

    useEffect(() => {
        if (response && response.ok) {
            alert('Workspace creado exitosamente!')
        }
    }, [response])


    return (
        <div className='workspacescreen-general-container'>
            <div className='create-workspace-card'>
                <div className='create-workspace-header'>
                    <div className='tittle-and-subtitle-container'>
                        <h1>Crear Nuevo Workspace</h1>
                        <p>Configura tu espacio de trabajo</p>
                    </div>
                    <div className="image-slack-logo-container">
                        <img src="https://a.slack-edge.com/bv1-13/slack_logo-e971fd7.svg" alt="logo-slack" />
                    </div>
                </div>

                <form className='create-workspace-form' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="name">Nombre del Workspace *</label>
                        <input
                            type="text"
                            id="name"
                            name={CREATE_WORKSPACE_FIELDS.NAME}
                            value={formState[CREATE_WORKSPACE_FIELDS.NAME]}
                            onChange={onInputChange}
                            placeholder="Mi Equipo"
                            required
                            className='workspace-input'
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="url_image">URL de Imagen (opcional)</label>
                        <input
                            type="url"
                            id="url_image"
                            name={CREATE_WORKSPACE_FIELDS.URL_IMAGE}
                            value={formState[CREATE_WORKSPACE_FIELDS.URL_IMAGE]}
                            onChange={onInputChange}
                            placeholder="https://ejemplo.com/imagen.jpg"
                            className='workspace-input'
                        />
                        <small className='input-hint'>
                            Agrega una imagen para personalizar tu workspace
                        </small>
                    </div>

                    {error && (
                        <div className='error-message'>
                            {error}
                        </div>
                    )}

                    <div className='button-group'>
                        <button
                            type='submit'
                            className='create-button cufflink-buttons'
                            disabled={loading}
                        >
                            {loading ? 'Creando...' : 'Crear Workspace'}
                        </button>
                        <button
                            type='button'
                            className='cancel-button cufflink-buttons'
                            onClick={() => navigate('/home')}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateWorkspaceScreen