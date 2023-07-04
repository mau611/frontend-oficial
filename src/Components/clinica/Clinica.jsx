import React from "react";
import NavBar from "../estructura/NavBar";
import FormularioHistoria from "./historias/FormularioHistoria";


export const Clinica = () => {
  return (
    <NavBar>
        <h1>Historias Clinicas</h1>
        <br />
        <FormularioHistoria/>
    </NavBar>
  );
};

export default Clinica;
