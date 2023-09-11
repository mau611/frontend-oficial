import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const endpoint = "http://scapi.shantispawellnesslife.com/api";

const Filiacion = ({
  id,
  nombres,
  apellidos,
  ci,
  telefono,
  sexo,
  direccion,
  fecha_nacimiento,
}) => {
  const navigate = useNavigate();

  const guardarDatosPaciente = async () => {
    await axios
      .post(`${endpoint}/paciente/${id}`, {
        nombres: nombres,
        apellidos: apellidos,
        telefono: ci,
        ci: telefono,
        sexo: sexo,
        direccion: direccion,
      })
      .then(function () {
        window.alert("Datos modificados correctamente");
        navigate(0);
      })
      .catch(function (error) {
        window.alert("Hubo un error guardando los datos");
        console.log(error);
      });
    navigate(0);
  };

  return (
    <div style={{ textAlign: "justify" }}>
      <h3>Datos Personales</h3>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "350px" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="nombres"
          label="Nombres"
          variant="outlined"
          value={nombres}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="apellidos"
          label="Apellidos"
          variant="outlined"
          value={apellidos}
          InputLabelProps={{ shrink: true }}
        />
        <br />
        <TextField
          id="telefono"
          label="Telefono"
          variant="outlined"
          value={ci}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="carnet"
          label="Carnet"
          variant="outlined"
          value={telefono}
          InputLabelProps={{ shrink: true }}
        />
        <br />
        <TextField
          id="sexo"
          label="Sexo"
          variant="outlined"
          value={sexo}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="fecha_nacimiento"
          label="fecha_nacimiento"
          variant="outlined"
          value={fecha_nacimiento}
          InputLabelProps={{ shrink: true }}
        />
        <br />
        <TextField
          id="direccion"
          label="Direccion"
          variant="outlined"
          value={direccion}
          InputLabelProps={{ shrink: true }}
        />
        <br />
        <Button
          variant="contained"
          color="warning"
          href={`/editarPaciente/${id}`}
        >
          Editar Datos Paciente
        </Button>
      </Box>
    </div>
  );
};

export default Filiacion;
