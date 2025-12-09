import React, { useContext, useEffect } from "react";
import useFetch from "../../Hooks/useFetch";
import '../../styles/homeScreen.css'
import { data, Link, useNavigate } from "react-router-dom";
import { getWorkspaces } from "../../services/workspace.service";
import { AuthContext } from "../../Context/AuthContext";

const HomeScreenComponent = () => {
    const navigate = useNavigate()
    const { sendRequest, response, loading, error } = useFetch()
    const { onLogout, user } = useContext(AuthContext)

    useEffect(
        () => {
            sendRequest(
                () => getWorkspaces()
            )
        },
        []
    )

    const handleCreateWorkspace = () => {
        navigate('/verify-code')
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
                            <li>Funciones</li>
                            <li>Soluciones</li>
                            <li onClick={onLogout} style={{ cursor: 'pointer' }}>Logout</li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="home-header-buttons">
                <button className="talk-to-sales-button">HABLAR CON VENTAS</button>
                <button className="create-workspace-header-button">CREAR UN NUEVO ESPACIO DE TRABAJO</button>
            </div>
        </header>
        <main className="home-screen-main-container">
            <div className="workspace-container">
                <div className="email-user-reference">
                    <h4>Espacios de trabajo de {user?.email}</h4>
                </div>
                {loading ? (
                    <span>Cargando...</span>
                ) : error ? (
                    <span style={{ color: 'red' }}>Error: {error}</span>
                ) : (
                    <div className="user-workspaces-container">
                        {response?.data?.workspaces?.length === 0 ? (<span>No hay workspaces creados aun</span>)
                            : (response && response.data.workspaces.map((workspace) => {
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
                            }))}
                    </div>)
                }
            </div>
            <div className="create-workspace-container">
                <span>Quieres usar slack con otro equipo?</span>
                <button onClick={handleCreateWorkspace}>Crear un nuevo espacio de trabajo</button>
            </div>
        </main>
        <footer></footer>
    </div>
}

export default HomeScreenComponent;