import { useState } from "react"

//Tiene la responsabilidad de manejar el estado de un formulario a lo largo de mi app
const useForm = (initial_form_state, onSubmit) => {
    // Estado con los valores del formulario
    const [form_State, setFormState] = useState(initial_form_state)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    //onInputChange la puedo utilizar porque es agnostica al formulario al igual que handleSubmit
    const onInputChange = (e) => {
        //Que campo estamos modificando
        const field = e.target
        //Capturamos el nombre del campo del formulario
        const field_name = field.name
        //Capturamos el valor del campo del formulario
        const field_value = field.value

        //Modifico el estado del formulario
        setFormState(
            (prevFormState) => {
                return { ...prevFormState, [field_name]: field_value }
            }
        )
    }

    // En handleSubmit saco onRegister porque es especifica de cada formulario y agrego onSubmit como parametro
    const handleSubmit = (e) => {
        //Evitamos que la pagina se recargue
        e.preventDefault()
        //Llamamos a la funcion de onSubmit
        onSubmit(form_State)
    }

    const resetForm = () => {
        setFormState(initial_form_state)
    }

    // Yo quiero que estas funciones salgan del hook para poder usarlas en los formularios
    //Cuando quiero sacar algo del hook uso return
    return {
        form_State,
        onInputChange,
        handleSubmit,
        resetForm,
    }
}

export default useForm