import React, { useEffect } from 'react'
import '../../styles/channelListComponent.css'
import useFetch from '../../Hooks/useFetch'
import { getWorkspaceById } from '../../services/workspace.service'
import { useParams } from 'react-router'

const ChannelListComponent = () => {
    const {workspace_id} = useParams()
    const {sendRequest, channel_detail, workspace_detail, response, loading, error} = useFetch()
    useEffect(() => {
            sendRequest(() => getWorkspaceById(workspace_id))
        }, [workspace_id])

    return (
        <div>
            <aside className='general-aside-container'>
                <div className='name-and-options-container'>
                    <div className='name-container'>
                        <h1>{workspace_detail?.name}</h1>
                        <h2>hola</h2>
                    </div>
                    <div className='options-container'>
                        <span>Canales </span>
                        { channel_detail && channel_detail?.map((channel) => {
                            return (
                                <div key={channel.id}>
                                    <span>{channel.name}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default ChannelListComponent
