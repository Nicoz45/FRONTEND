import React, { useEffect } from 'react'
import useFetch from '../../Hooks/useFetch'
import { Link } from 'react-router'
import getWorkspaces from '../../services/workspace.service'

const HomeScreen = () => {

    const { sendRequest, response, loading, error } = useFetch()

    useEffect(
        () => {
            sendRequest(
                () => getWorkspaces()
            )
        },
        []
    )
    
    return (
        <div className='home-screen-general-container'>
            <h1>Lista de espacios de trabajo</h1>
            {
                loading
                    ? <span>Cargando...</span>
                    : <div>
                        {response &&
                            response.data.workspaces.map((workspace) => {
                                return (
                                    <div>
                                        <h2>{workspace.workspace_name}</h2>
                                        <Link to={'/workspace/' + workspace.workspace_id}>Abrir workspace</Link>
                                    </div>
                                )
                            })}
                    </div>
            }
        </div>
    )
}

export default HomeScreen