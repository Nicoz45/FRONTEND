import React, { useEffect } from "react";
import useFetch from "../../Hooks/useFetch";
import '../../styles/homeScreen.css'
import { Link } from "react-router";
import getWorkspaces from "../../services/workspace.service";

const HomeScreenComponent = () => {
    const { sendRequest, response, loading, error } = useFetch()
    
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
                        <li>Home</li>
                        <li>Logout</li>
                    </ul>
                </nav>
                <div className="home-header-buttons">
                    <button>Hablar con ventas</button>
                    <button>Crear un nuevo espacio de trabajo</button>
                </div>
            </header>
            <main className="home-screen-main-container">
                <div className="workspace-container">
                    <h1>Lista de espacios de trabajo</h1>
            {
                loading
                    ? <span>Cargando...</span>
                    : <div>
                        {response &&
                            response.data.workspaces.map((workspace) => {
                                return (
                                    <div className="workspace-selected">
                                        <div>
                                            
                                            <h2>{workspace.workspace_name}</h2>
                                        </div>
                                        <Link to={'/workspace/' + workspace.workspace_id}>Iniciar slack</Link>
                                    </div>
                                )
                            })}
                    </div>
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