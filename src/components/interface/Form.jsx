import React, { useState, useEffect } from "react";
import axios from "axios";

export const Form = () => {
    const [inputs, setInputs] = useState({
        nombre: "",
        email: "",
        message: ""
    });

    const [fieldErrors, setFieldErrors] = useState({});

    const validationRules = {
        nombre: val => !!val,
        email: val => val && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        message: val => !!val
    };
    
    const validate = () => {
        let errors = {};
        let hasErrors = false;

        for (let key of Object.keys(inputs)) {
            errors[key] = !validationRules[key](inputs[key]);
            hasErrors |= errors[key];
        }
        
        setFieldErrors(prev => ({ ...prev, ...errors }));
        return !hasErrors;
    };

    const renderFieldError = field => {
        if (fieldErrors[field]) {
            return <p className="mt-1 text-red-500">Porfavor agrega un {field} valido.</p>;
        }
    };

    useEffect(() => {
        if (Object.keys(fieldErrors).length > 0) {
            validate();
        }
        }, [inputs]);

        const handleOnChange = event => {
            event.persist();
            setInputs(prev => ({
                ...prev,
                [event.target.id]: event.target.value
        }));
    };

    const [serverState, setServerState] = useState({
        submitting: false,
        status: null
    });

    const handleServerResponse = (ok, msg) => {
        setServerState({
            submitting: false,
            status: { ok, msg }
        });
        if (ok) {
            setFieldErrors({});
            setInputs({
                nombre: "",
                email: "",
                message: ""
            });
        }
    };

    const handleOnSubmit = event => {
        event.preventDefault();
        if (!validate()) {
            return;
        }
        setServerState({ submitting: true });
        axios({
            method: "POST",
            url: "https://formspree.io/mqkvleqg",
            data: inputs
        })
        .then(r => {
            handleServerResponse(true, "Gracias! me pondré en contacto pronto.");
        })
        .catch(r => {
            handleServerResponse(false, r.response.data.error);
        });
    };

    const classFieldError = () => {
        return "block w-full rounded-md border-0 text-red-900 shadow-sm placeholder:text-red-400 p-2";
    }

    const classFieldDefault = () => {
        return "block w-full rounded-md border-0 text-gray-900 shadow-sm placeholder:text-gray-400 p-2";
    }

    return (
        <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white" cursor-class="arrow">Contactame</h2>
            <div className="mt-8 p-8 rounded-md bg-white bg-opacity-50 w-80 max-w-full">
                {serverState.status && serverState.status.ok ? (
                    <p className="text-gray-900 text-center successMsg">
                        {serverState.status.msg}
                    </p>
                ) : (
                    <form onSubmit={handleOnSubmit} noValidate>
                        <label htmlFor="nombre" className="font-medium text-gray-900 block mb-1">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            placeholder="Nombre Apellido"
                            onChange={handleOnChange}
                            value={inputs.nombre}
                            className={fieldErrors.nombre ? classFieldError() : classFieldDefault()}
                        />
                        {renderFieldError("nombre")}
                        <label htmlFor="email" className="font-medium text-gray-900 block mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleOnChange}
                            value={inputs.email}
                            className={fieldErrors.email ? classFieldError() : classFieldDefault()}
                            placeholder="email@host.com"
                        />
                        {renderFieldError("email")}
                        <label htmlFor="message" className="font-medium text-gray-900 block mb-1">Mensaje</label>
                        <textarea
                            placeholder="Deja tu mensaje"
                            name="message"
                            id="message"
                            onChange={handleOnChange}
                            value={inputs.message}
                            className={fieldErrors.email ? classFieldError() : classFieldDefault()}
                        />
                        {renderFieldError("message")}
                        <button
                            type="submit"
                            disabled={serverState.submitting}
                            className="bg-cyan-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16"
                        >
                            Enviar
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};