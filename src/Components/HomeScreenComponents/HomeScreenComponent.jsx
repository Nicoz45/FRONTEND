import React, { useContext, useEffect } from "react";
import useFetch from "../../Hooks/useFetch";
import '../../styles/homeScreen.css'
import { data, Link } from "react-router";
import { getWorkspaces } from "../../services/workspace.service";
import { AuthContext } from "../../Context/AuthContext";

const HomeScreenComponent = () => {
    const { sendRequest, response, loading, error } = useFetch()
    const { onLogout, user} = useContext(AuthContext)

    useEffect(
        () => {
            sendRequest(
                () => getWorkspaces()
            )
        },
        []
    )
    return <div className="home-screen-component-container">
        <header className="general-header-container">
            <h2>Slack</h2>
            <nav className="home-nav-container">
                <ul>
                    <li>Funciones</li>
                    <li>Soluciones</li>
                    <li onClick={onLogout} style={{ cursor: 'pointer' }}>Logout</li>
                </ul>
            </nav>
            <div className="home-header-buttons">
                <button>Hablar con ventas</button>
                <button>Crear un nuevo espacio de trabajo</button>
            </div>
        </header>
        <main className="home-screen-main-container">
            <div className="workspace-container">
                <div className="email-user-reference">
                    <h3>Espacios de trabajo de {user?.email}</h3>
                </div>
                {loading ? (
                    <span>Cargando...</span>
                ) : error ? (
                    <span style={{ color: 'red' }}>Error: {error}</span>
                ) : (
                    <div>
                        {response?.data?.workspaces?.length === 0 ? (<span>No hay workspaces creados aun</span>)
                            : (response && response.data.workspaces.map((workspace) => {
                                return (
                                    <div key={workspace.workspace_id} className="workspace-selected">
                                        <div className="workspace-info">
                                            {workspace.workspace_url_image ? (
                                                <img src={workspace.workspace_url_image} 
                                                alt={workspace?.workspace?.name}
                                                className="workspace-image"/>) :
                                                (
                                                    <div className="workspace-avatar">
                                                        {workspace.workspace_name?.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            <h2>{workspace.workspace_name}</h2>
                                            <Link to={`/workspace/${workspace.workspace_id}`}>Iniciar slack</Link>
                                        </div>
                                    </div>
                                )
                            }))}
                    </div>)
                }
            </div>
            <div className="create-workspace-container">
                <span>Quieres usar slack con otro equipo?</span>
                <button>Crear un nuevo espacio de trabajo</button>
            </div>
        </main>
        <footer></footer>
    </div>
}

export default HomeScreenComponent;