import React from 'react'
import { useLocation } from 'react-router'
import './HomeScreen.css'

const HomeScreen = () => {
    return (
        <div className='home-screen-container'>
            <header className='general-header-container'>
                <div className='logo'>
                    <h1>SGPT</h1>
                    <span>Sistema de Gestión de Proyectos y Tareas</span>
                </div>
                <nav className='nav-bar'>
                    <ul>
                        <li>Proyectos</li>
                        <li>Tareas</li>
                        <li>Usuarios</li>
                        <li>Foro</li>
                    </ul>
                </nav>
            </header>
            <main className='Principal-screen'>
                <div className="welcome-title">
                    <h2>Bienvenido a SGPT</h2>
                    <p>Tu sistema integral para la gestión eficiente de proyectos y tareas.</p>
                </div>
            </main>
            <footer>
                <div className='footer-text'>
                    <span>© 2025 SGPT, Todos los derechos reservados</span>
                </div>
            </footer>
        </div>
    )
}

export default HomeScreen