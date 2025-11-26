import React from 'react'
import { Routes, Route } from 'react-router'
import HomeScreen from './screens/HomeScreen/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen.jsx'
import './styles/index.css'
import AuthMiddleware from './Middleware/authMiddleware.jsx'
import WorkspaceScreen from './screens/WorkspaceScreen/WorkspaceScreen.jsx'

function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<LoginScreen />} />
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/register' element={<RegisterScreen />} />
                <Route element={<AuthMiddleware/>}>
                    <Route path='/Home' element={<HomeScreen />} />
                    <Route path='/workspace/:workspace_id' element={<WorkspaceScreen />} />
                    {/* <Route path='/workspace/:workspace_id/channel/:channel_id' element={<ChannelScreen />} /> */}
                </Route>
            </Routes>
        </div>
    )
}

export default App
