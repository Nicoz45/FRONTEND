### REGISTER SCREEN
Creamos un componente llamado `RegisterScreen`. Es un formulario para el registro de usuarios.
El componente inicializa una constante llamada `REGISTER_FORM_FIELDS` con tres campos: `USERNAME`, `EMAIL` y`PASSWORD`. Tambien inicializa una variable de estado llamada `formState` utilizando el hook `useState`, con un valor inicial que es un objeto con cadenas vacias para cada campo.
El componente define a una funcion `onInputChange` que se llama cada vez que se modifica un campo de entrada en el formulario. Esta funcion actualiza el `formState` creando un nuevo objeto con el valor actualizado del campo.
El componente tambien define una funcion `handleSubmit` que se llama cuando se envia el formulario. Evita el comportamiento predeterminado de envio del formulario y llama a la funcion `onRegister` con el `formState` actual.
La funcion `onRegister` registra el `formState` en la consola.
El componente renderiza un formulario con tres campos de entrada para el nombre de usuario, el correo electronico y la contraseña. Cada campo de entrada tiene un controlador de eventos `onChange` que llama a la funcion `onInputChange`. La propiedad *value* de cada campo de entrada se establece en el valor correspondiente en el objeto `formState`.
Finalmente, hay un boton de envio que desencadena el envio del formulario y llama a la funcion `handleSubmit`.
Este fragmento de codigo representa un formulario de registro en un componente de React.

Toda esta logica podria hacerla directamente en un Hook.
Asi como puedo manejar estados en un Hook, tambien puedo manejar la logica. Es una manera de separar toda la logica del formulario del componente dentro de un Hook aparte para poder reutilizarla cuando yo quiera.

Alternativa a crear un Hook personalizado, podemos usar una libreria llamada react hook forms / react formik

### useForm (Hook personalisado para formularios)
En este caso recibe 2 parametros (initial_state) y (onSubmit). El hook se encarga de administrar el estado de un formulario a lo largo de mi aplicacion.
Dentro del hook, se inicializa el estado con (initial_form_state) utilizando el hook `useState`. Tambien se definen dos funciones: (onImputChange) y (handleSubmit).
La funcion "onInputChange" se llama cada vez que se modifica un campo del formulario. Captura el nombre y el valor del campo modificado, y actualiza el estado del formulario extendiendo el estado anterior y actualizando el valor del campo modificado.
La funcion "handleSubmit" se llama cuando se envia el formulario. Evita el comportamiento predeterminado de envio del formulario y llama a la funcion "onSubmit" con el estado actual del formulario.
Tambien hay una funcion 'resetForm' que reinicia el estado del formulario a su estado inicial.
El hook devuelve un objeto con el estado del formulario (form_state), la funcion "onInputChange", la funcion handleSubmit y la funcion reserForm. Esto te permite utilizar estas funciones en tus componentes de formulario.
Este hook proporciona una forma conveniente de administrar el estadi y manejar la presentacion de formularios en tus componentes de react.

### CORS POLICY (no se permite scripting de origen cruzado)
- Por defecto el navegador no permite consultas HTTP entre distintos dominios/puertos

- Esto quiere decir que yo no puedo emitir consultas de mi front en el puerto 5173 a mi api en el puerto 8080.

- Para solucionar esto nos instalamos una libreria llamada cors en nuestra api, que es lo que nos permite modificar la politica de cors.
        npm install cors


### OBjeto de JS que nos perite utilizar url.
- Vamos a LoginScreen y ponemos lo siguiente:
        new URLSearchParams(useLocation().search)

`useLocation().search`:
    Es una llamada a una funcion proporcionada por la biblioteca de enrutamiento de React Router.
`useLocation()`:
    Es un hook de React que devuelve la informacion de ubicacion actual del navegador. Esta informacion incluye la URL completa, incluyendo la cadena de consulta.
`search`:
    Es una propiedad de la informacion de ubicacion que contiene la cadena de consulta de la URL. La cadena de consulta es la parte de la URL que comienza con un signo de interrogacion (?) y contiene parametros o filtros.
En useLocation().search se utiliza para obtener la cadena de consulta de la URL actual y luego extraer el valor del parametro *from* utilizando *query.get(`from`)*. Esto se hace para verificar si la URL contiene el parametro `from` con el valor `verified_email`, lo que indica que se ha verificado el correo electronico correctamente.

### LoginScreen (componente)
Dentro del componente, se verifica si el parametro `from` en la cadena de consulta de la URL es igual a `verified_email`. Si es asi, se muestra una alerta con el mensaje "Has verificado tu email correctamente, ya puedes iniciar sesion".

### useFetch (Fetch es una funcion nativa de JS para hacer consultas HTTP)

### CLASE 19:
- Hicimos correctamente el formulario de login, creamos la logica de negocio en authService.js
- Y hcimos que si el correo y la contraseña son correctas una vez logueados nos redirecciona a la pagina /home
    De esta manera:
        const navigate = useNavigate()
        useEffect(
            () => {
                if (response && response.ok) {
                    //Queremos que persista el token en el localStorage
                    localStorage.setItem('auth_token', response.body.auth_token)
                    navigate('/home')
                }
            },
            [response] 
        )


- Ahora pasamos a hacer un meddleware que va a verifucar si en el local storage va a estar el auth_token
        const AuthMiddleware = () => {
            const auth_token = localStorage.getItem('auth_token');
            if(auth_token){
                return <Outlet/>
            }
            else{
                return <Navigate to={"/login"}/>
            }
                
        }

        export default AuthMiddleware;

- En mi App.jsx lo usariamos de la siguiente manera:
                <Route element={<AuthMiddleware/>}>
                    <Route path='/Home' element={<HomeScreen />} />
                </Route>

- Esto es para que primero pase por una autenticacion antes de ir a la pagina del home.

- Ahora pasamos a crear un contexto
        const AuthContext = createContext();

        const AuthContextProvider = ({ children }) => {
            const navigate = useNavigate()
            // Estamos guardando datos de sesion
            const [user, setUser] = useState(null)

            //Marca si esta o no logueado el usuario.
            const [isLogged, setIsLogged] = useState(Boolean(localStorage.getItem('auth_token')))

            //Una vez se monte el componente, decodificar el token y guardar los datos de sesion
            useEffect(() => {
                const auth_token = localStorage.getItem('auth_token')
                if (auth_token) {
                    const result = jwt.decode(auth_token)
                    setUser(result)
                    setIsLogged(true)
                }
                else {
                    setIsLogged(fale)
                    setUser(null)
                }
            }, []
            )

            const logout = () => {
                //Hacemos que se borre el auth_token cuando cerramos sesion
                localStorage.removeItem('auth_token')
                setIsLogged(false)
                setUser(null)
                //Podemos hacer una redireccion una vez que se cierre la sesion
                navigate('/login')

            }
            return <AuthContext.Provider>
                {children}
            </AuthContext.Provider>
        }

        export default AuthContextProvider

- Ahora mismo en el contexto hacemos una funcion de login que va a tener la funcion que tiene mi useEffect en LoginScreen.jsx, por lo que vamos a copiar parte del codigo y borrarlo del useEffect de mi LoginScreen.
        const login = (auth_token) => {
                localStorage.setItem('auth_token', auth_token)
                        navigate('/home')
            }

- Y ahora ya tengo mi logica de login y logout dentro de un contexto y lo pasamos al main.jsx

- Ahora para utilizar este contexto tendriamos que pasar a modificar nuestro codigo
    Pasamos el onLogin a LoginScreen y lo utilizamos en el useEffect de la siguiente manera:
    useEffect(
        () => {
            if (response && response.ok) {
                //Queremos que persista el token en el localStorage
                onLogin(response.body.auth_token)
            }
        },
        [response]
    )

- Lo siguiente que podemos hacer es sincronizar el Middleware, para que se ahorre hacer la verificacion del auth_token en el local storage.
Le pasamos el isLogged del contexto.

### react-jwt
Es el sustituto de jsonwebtoken

Como no podemos usar jsonwebtoken en frontend y solo sirve para back, tenemos la mejor alternativa que es react-jwt


