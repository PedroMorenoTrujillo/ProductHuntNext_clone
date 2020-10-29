import React, { useState } from 'react';
import Router from 'next/router'
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Layout from '../components/layouts/Layout';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario'; 

// Importar firebase
import firebase from '../firebase';

// Validaciones
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

const Login = () => {

  const [error, guardarError] = useState(false);
   
  const STATE_INICIAL = {
    email: '',
    password: ''
  };

  const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);
  
  // Extraer de valores
  const { email, password } = valores;

  async function iniciarSesion() {
    try {
      await firebase.login(email, password);
      Router.push('/');
    } catch (error) {
      console.error('Hubo un error al crear el usuario', error.message);
      guardarError(error.message);
    }
  }

   return (
     <Layout>
       <>
         <h1 css={css`
            text-align: center;
            margin-top: 5rem;
         `}>
           Iniciar Sesion</h1>
         <Formulario
           onSubmit={handleSubmit}
           noValidate
         >
           <Campo>
             <label htmlFor="email">Email</label>
             <input
               type="email"
               id="email"
               placeholder="Tu Email"
               name="email"
               value={email}
               onChange={handleChange}
               onBlur={handleBlur}
             />
           </Campo>

           {errores.email && <Error>{errores.email}</Error>}

           <Campo>
             <label htmlFor="password">Password</label>
             <input
               type="password"
               id="password"
               placeholder="Tu Password"
               name="password"
               value={password}
               onChange={handleChange}
               onBlur={handleBlur}
             />
           </Campo>

           {errores.password && <Error>{errores.password}</Error>}
           
           {error && <Error>{error}</Error>}

           <InputSubmit type="submit" value="Iniciar Sesion"/>
         </Formulario>
       </>
    </Layout>
  )
}

export default Login;