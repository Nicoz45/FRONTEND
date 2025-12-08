import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen.jsx'
import './styles/index.css'
import AuthMiddleware from './Middleware/authMiddleware.jsx'
import WorkspaceScreen from './screens/WorkspaceScreen/WorkspaceScreen.jsx'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen/ForgotPassword.jsx'
import ResetPasswordScreen from './screens/ResetPasswordScreen/ResetPassword.jsx'
import VerificationCodeScreen from './screens/VerificationScreens/VerificationScreen.jsx'
import CreateWorkspaceScreen from './screens/CreateWorkspaceScreen/CreateWorkspaceScreen.jsx'

function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<LoginScreen />} />
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/register' element={<RegisterScreen />} />
                <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
                <Route path='/reset-password/:token' element={<ResetPasswordScreen />} />

                <Route element={<AuthMiddleware />}>
                    <Route path='/Home' element={<HomeScreen />} />
                    <Route path='verify-code' element={<VerificationCodeScreen />} />
                    <Route path='create-workspace' element={<CreateWorkspaceScreen />} />
                    <Route path='/workspace/:workspace_id' element={<WorkspaceScreen />} />
                    {/* <Route path='/workspace/:workspace_id/channel/:channel_id' element={<ChannelScreen />} /> */}
                </Route>
            </Routes>
            <ErrorBoundary>
                <Routes>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </ErrorBoundary>
        </div>
    )
}

function ErrorBoundary({ children }) {
    const [error, setError] = useState(null)

    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <p>{error.message}</p>
            </div>
        )
    }

    return children
}

function NotFound() {
    return (
        <div>
            <h1>404: Not Found</h1>
            <p>Página no encontrada</p>
        </div>
    )
}

export default App
