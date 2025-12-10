import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import '../../styles/homeScreen.css'
import { Link, useNavigate } from "react-router-dom";
import { deleteWorkspace, getWorkspaces } from "../../services/workspace.service";
import { AuthContext } from "../../Context/AuthContext";
import ICONS from "../../constants/Icons";

const HomeScreenComponent = () => {
    const navigate = useNavigate()
    const { sendRequest, response, loading, error, resetResponse } = useFetch()
    const { onLogout, user } = useContext(AuthContext)
    const [refreshKey, setRefreshKey] = useState(0)

    const fetchWorkspaces = () => {
        resetResponse()
        sendRequest(() => getWorkspaces())
    }

    useEffect(() => {
        fetchWorkspaces()
    }, [refreshKey])

    useEffect(() => {
        if (response) {
            console.log('Response completo:', response)
            console.log('Workspaces:', response?.data?.workspaces)
        }
    }, [response])

    // Recargar workspaces cuando la ventana recupera el foco
    useEffect(() => {
        const handleFocus = () => {
            fetchWorkspaces()
        }
        window.addEventListener('focus', handleFocus)
        return () => window.removeEventListener('focus', handleFocus)
    }, [])

    const handleCreateWorkspace = () => {
        navigate('/verify-code')
    }

    const handleDeleteWorkspace = async (workspace_id, workspace_name) => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar "${workspace_name}"?`)) {
            try {
                console.log('Eliminando workspace:', workspace_id)
                const result = await deleteWorkspace(workspace_id)
                console.log('Resultado eliminación:', result)
                // Recargar la lista después de eliminar
                fetchWorkspaces()
            } catch (error) {
                console.error('Error al eliminar:', error)
                alert('Error al eliminar el workspace: ' + (error?.message || 'Error desconocido'))
            }
        }
    }

    return <div className="home-screen-component-container">
        <header className="general-header-container">
            <div className="logo-and-nav-container">
                <div className="home-logo-container">
                    <img src="https://a.slack-edge.com/38f0e7c/marketing/img/nav/slack-salesforce-logo-nav-white.png" alt="slack-logo" style={{ width: '100px' }} />
                </div>
                <div>
                    <nav className="home-nav-container">
                        <ul>
                            <li>Funciones <ICONS.ArrowDown className="arrow-down" /></li>
                            <li>Soluciones <ICONS.ArrowDown className="arrow-down" /></li>
                            <li>Empresa</li>
                            <li>Recursos <ICONS.ArrowDown className="arrow-down" /></li>
                            <li onClick={onLogout} style={{ cursor: 'pointer' }}>Logout</li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="home-header-buttons">
                <button className="talk-to-sales-button">HABLAR CON VENTAS</button>
                <button className="create-workspace-header-button" onClick={handleCreateWorkspace}>CREAR UN NUEVO ESPACIO DE TRABAJO</button>
            </div>
        </header>
        <main className="home-screen-main-container">
            <div className="tittle-hello-container">
                <h1>¡Hola de nuevo!</h1>
            </div>
            <div className="workspace-container">
                <div className="email-user-reference">
                    <h4>Espacios de trabajo de {user?.email}</h4>
                </div>
                {loading ? (
                    <span>Cargando...</span>
                ) : error ? (
                    <span style={{ color: 'red' }}>Error: {error}</span>
                ) : response?.data?.workspaces?.filter(w => w.workspace_id)?.length === 0 ? (
                    <span>No hay workspaces creados aun</span>
                ) : (
                    <div className="user-workspaces-container">
                        {response && response.data.workspaces.filter(w => w.workspace_id).map((workspace) => {
                            console.log('Workspace object:', workspace)
                            return (
                                <div key={workspace.workspace_id} className="workspace-selected">
                                    <div className="workspace-info">
                                        {workspace.workspace_url_image ? (
                                            <div className="image-container">
                                                <img src={workspace.workspace_url_image}
                                                    alt={workspace?.workspace?.name}
                                                    className="workspace-image" />
                                            </div>) :
                                            (
                                                <div className="workspace-avatar">
                                                    {workspace.workspace_name?.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        <h3>{workspace.workspace_name}</h3>
                                    </div>
                                    <div className="button-link-container">
                                        <Link to={`/workspace/${workspace.workspace_id}`} className="button-link-to-slack">INICIAR SLACK</Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>)
                }
            </div>
            <div className="create-workspace-container">
                <div className="img-and-text-container">
                    <img src="/img/woman-with-laptop-color-background-new.png" alt="Woman png" />
                    <span style={{ fontWeight: 600 }}>¿Quieres usar slack con otro equipo?</span>
                </div>
                <div className="button-create-workspace-container">
                    <button className="button-create" onClick={handleCreateWorkspace}>CREAR UN NUEVO ESPACIO DE TRABAJO</button>
                </div>
            </div>
            <span className="no-workspace-text">¿No encuentras tu espacio de trabajo? <Link to={'/login'} className="other-email-link">Prueba con otro correo electronico <ICONS.ArrowRight /> </Link></span>
            <div className="download-container">
                <div className="image-and-text-container">
                    <div className="image-download-container">
                        <img src="/img/Dowload-image.png" alt="Download-image" className="download-image" />
                    </div>
                    <div className="text-download-container">
                        <h3>Slack para Windows</h3>
                        <span>Inicia Slack desde la bandeja para no perderte ninguna notificación en la computadora.</span>
                    </div>
                </div>
                <a href="#">Descargar</a>
            </div>
        </main>
        <footer></footer>
    </div>
}

export default HomeScreenComponent;