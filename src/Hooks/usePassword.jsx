import React, { useState } from "react";

const usePassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const toggleShowPassword = () => setShowPassword((prevState) => !prevState)
    const toggleShowConfirmPassword = () => setShowConfirmPassword((prevState) => !prevState)

    return {
        showPassword,
        showConfirmPassword,
        toggleShowPassword,
        toggleShowConfirmPassword
    }
}

export default usePassword