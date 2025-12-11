# Slack Clone - Frontend

Frontend de una aplicación tipo Slack desarrollada en React, que permite a los usuarios crear workspaces, gestionar canales y comunicarse en tiempo real.

## Características

- **Autenticación**: Registro, login, y recuperación de contraseña con tokens JWT
- **Workspaces**: Crear, visualizar y eliminar espacios de trabajo
- **Canales**: Gestionar canales dentro de cada workspace
- **Verificación de Email**: Código de verificación de 6 dígitos
- **Interfaz Responsiva**: Diseño moderno similar a Slack
- **Rutas Protegidas**: Middleware de autenticación para acceso seguro

## Tabla de Contenidos

- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Componentes Principales](#componentes-principales)
- [Hooks Personalizados](#hooks-personalizados)
- [Servicios](#servicios)
- [Autenticación](#autenticación)
- [Variables de Entorno](#variables-de-entorno)
- [Deploy](#deploy)
- [Troubleshooting](#troubleshooting)

## Instalación

### Requisitos Previos
- Node.js 16+ 
- npm o yarn
- Git

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/Nicoz45/FRONTEND.git
cd FRONTEND
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crear archivo `.env.local` en la raíz del proyecto:
```
VITE_API_URL=http://localhost:3000
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Configuración

### Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL del backend | `https://backend-api.vercel.app` |

### Archivo de Configuración

Ver `src/config/environment.config.js` para más detalles sobre la configuración.

## Estructura del Proyecto

```
src/
├── App.jsx                          # Componente raíz con rutas
├── main.jsx                         # Entry point
├── Components/
│   └── HomeScreenComponents/
│       └── HomeScreenComponent.jsx  # Listado de workspaces
│   └── ChannelsListComponent.jsx/
│       └── ChannelListComponent.jsx # Listado de canales
├── Hooks/
│   ├── useFetch.jsx                # Hook para peticiones HTTP
│   ├── useForm.jsx                 # Hook para manejo de formularios
│   ├── useVerificationCode.jsx     # Hook para verificación de código
│   └── useWorkspaceDetail.jsx      # Hook para obtener detalles del workspace
├── Context/
│   └── AuthContext.jsx             # Context global de autenticación
├── Middleware/
│   └── authMiddleware.jsx          # Middleware de rutas protegidas
├── services/
│   ├── authService.js              # Funciones de autenticación
│   └── workspace.service.js        # Funciones de workspaces
├── screens/
│   ├── LoginScreen/
│   ├── RegisterScreen/
│   ├── ForgotPasswordScreen/
│   ├── ResetPasswordScreen/
│   ├── HomeScreen/
│   ├── WorkspaceScreen/
│   ├── CreateWorkspaceScreen/
│   └── VerificationScreens/
├── styles/
│   ├── index.css
│   ├── loginScreen.css
│   ├── registerScreen.css
│   ├── homeScreen.css
│   ├── workspaceScreen.css
│   └── ...
└── config/
    └── environment.config.js       # Configuración de variables
```

## Scripts Disponibles

```bash
# Desarrollar
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linter
npm run lint
```

## Tecnologías Utilizadas

- **React 19.2.1**: Librería de UI
- **Vite**: Build tool rápido
- **React Router DOM 7.10.1**: Enrutamiento
- **react-jwt**: Decodificación de JWT
- **react-icons**: Iconos
- **dotenv**: Manejo de variables de entornos

## Componentes Principales

### HomeScreenComponent
Pantalla principal que muestra los workspaces del usuario.

**Features:**
- Listado de workspaces
- Botón para crear workspace
- Botón para eliminar workspace
- Logout

**Props:** Ninguno (usa Context)

### VerificationCodeScreen
Pantalla para verificar código de 6 dígitos.

**Features:**
- Entrada de código de 6 dígitos
- Timer de expiración
- Reenviar código
- Validación en tiempo real

### WorkspaceScreen
Pantalla principal del workspace con canales.

**Features:**
- Buscador de mensajes/canales
- Información del workspace

## Hooks Personalizados

### `useFetch`
Hook genérico para hacer peticiones HTTP.

```javascript
const { response, loading, error, sendRequest, resetResponse } = useFetch()

sendRequest(() => getWorkspaces())
```

**Returns:**
- `response`: Respuesta del servidor
- `loading`: Estado de carga
- `error`: Error si ocurrió
- `sendRequest`: Función para enviar petición
- `resetResponse`: Función para limpiar estado

### `useForm`
Hook para manejar estados de formularios.

```javascript
const { form_State, onInputChange, handleSubmit, resetForm } = useForm(
  initialState, 
  onSubmit
)
```

### `useVerificationCode`
Hook especializado para código de verificación.

```javascript
const {
  code,
  timer,
  canResend,
  isCodeComplete,
  handleInputChange,
  handleVerify,
  handleResend
} = useVerificationCode()
```

### `useWorkspaceDetail`
Hook para obtener detalles de un workspace.

```javascript
const { workspace_detail, loading, error } = useWorkspaceDetail(workspace_id)
```

## Servicios

### `authService.js`
Funciones de autenticación:

```javascript
register(username, email, password)
login(email, password)
forgotPassword(email)
resetPassword(token, password)
```

### `workspace.service.js`
Funciones de workspace:

```javascript
getWorkspaces()
getWorkspaceById(workspace_id)
createWorkspace(name, url_image)
deleteWorkspace(workspace_id)
```

## Autenticación

### Flujo de Autenticación

1. **Registro**: Usuario crea cuenta con email y contraseña
2. **Verificación**: Sistema envía código de 6 dígitos al email
3. **Login**: Usuario ingresa email y contraseña
4. **Token JWT**: Backend retorna token que se guarda en `localStorage`
5. **Protección**: Rutas protegidas por `AuthMiddleware`

### AuthContext

Proporciona acceso global a:
- `user`: Datos del usuario autenticado
- `isLogged`: Estado de autenticación
- `onLogin(token)`: Función para login
- `onLogout()`: Función para logout

### Recuperación de Contraseña

1. Usuario solicita recuperación en `/forgot-password`
2. Backend envía enlace a email con token
3. Usuario accede a `/reset-password/:token`
4. Cambia su contraseña
5. Se redirige a login

## Rutas

### Rutas Públicas
- `/` → Login
- `/login` → Pantalla de login
- `/register` → Registro
- `/forgot-password` → Recuperar contraseña
- `/reset-password/:token` → Cambiar contraseña

### Rutas Protegidas (Requieren autenticación)
- `/home` → Home principal
- `/verify-code` → Verificación de código
- `/create-workspace` → Crear workspace
- `/workspace/:workspace_id` → Workspace específico

## Deploy

### Deploy en Vercel

1. **Conectar repositorio a Vercel**
   - Ir a https://vercel.com
   - Conectar con GitHub
   - Seleccionar este repositorio

2. **Configurar variables de entorno**
   - En Vercel: Settings → Environment Variables
   - Añadir `VITE_API_URL` con la URL del backend

3. **Deploy automático**
   - Cada push a `main` desplegará automáticamente

### Archivo de Configuración: `vercel.json`

```json
{
    "buildCommand": "npm run build",
    "outputDirectory": "dist",
    "rewrites": [
        {
            "source": "/(.*)",
            "destination": "/index.html"
        }
    ]
}
```

**Nota**: La configuración de `rewrites` es crucial para que React Router funcione correctamente con rutas dinámicas.

## Práctica y Convenciones

### Estructura de Componentes
- Imports
- Componente funcional
- Hooks
- Funciones handlers
- Return (JSX)
- Export

### Manejo de Errores
- Mostrar errores en el UI
- Console.log para debugging
- Mensajes de error claros al usuario

## Errores encontrados

### Error: "No routes matched location"
**Solución**: Verificar que la ruta esté definida en `App.jsx` con el nombre correcto del parámetro.

### Error: "Cannot read property of undefined"
**Solución**: Verificar que estés usando optional chaining (`?.`) para acceder a propiedades que podrían no existir.

### Workspace vacío después de eliminar
**Solución**: El componente filtra workspaces sin `workspace_id`. Verificar respuesta del backend.

### Token expirado
**Solución**: El usuario será redirigido a login automáticamente si el token es inválido.

### Problema con rutas dinámicas en producción
**Solución**: Asegurarse de que `vercel.json` tenga la configuración correcta de `rewrites`.

## Recursos Adicionales

- [Documentación de React](https://react.dev)
- [React Router DOM](https://reactrouter.com)
- [Vite](https://vitejs.dev)
- [Vercel Docs](https://vercel.com/docs)

## Autor

Nicolás Zarate (Nicoz45)

Este proyecto es parte del bootcamp Full Stack de UTN.

