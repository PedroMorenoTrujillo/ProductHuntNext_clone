import React, {useState, useEffect} from 'react';

const useValidacion = (stateInicial, validar, fn) => {

    // State inicial que viene en el parametro
    const [valores, guardarValores] = useState(stateInicial);
    // State por si hay errores
    const [errores, guardarErrores] = useState({});
    // State para pasar la validacion
    const [submitForm, guardarSubmitForm] = useState(false);

    useEffect(() => {
        if (submitForm) {
            const noErrores = Object.keys(errores).length === 0;
            if (noErrores) {
                fn(); // Fn = Funcion que se ejecuta en el componente    
            }
            guardarSubmitForm(false);
            
        }
    }, [errores])

    // Funcion que se ejecuta conforme el usuario escribe algo
    const handleChange = e => {
        guardarValores({
            ...valores,
            [e.target.name]: e.target.value
        });
    };

    // Funcion que se ejecuta cuando el usuario hace submit

    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarSubmitForm(true);
    };

    // Cuando se realiza el evento blur
    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
    };


    return {
        valores,
        errores,
        submitForm,
        handleSubmit,
        handleChange,
        handleBlur
    };
}

export default useValidacion;