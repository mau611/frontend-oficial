import React from "react";
import NavBar from "../estructura/NavBar";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";

export const EditarPaciente = () => {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [ci, setCi] = useState("");
  const [sexo, setSexo] = useState("");
  const [direccion, setDireccion] = useState("");
  const { id } = useParams();
  const endpoint = "http://localhost:8000/api";
  const navigate = useNavigate();

  useEffect(() => {
    const getPacienteById = async () => {
      const response = await axios.get(`${endpoint}/paciente/${id}`);
      setNombres(response.data.nombres);
      setApellidos(response.data.apellidos);
      setTelefono(response.data.telefono);
      setFechaNacimiento(response.data.fecha_nacimiento);
      setCi(response.data.ci);
      setSexo(response.data.sexo);
      setDireccion(response.data.direccion);
    };
    getPacienteById();
  }, []);

  const guardarDatosPaciente = async () => {
    await axios
      .put(`${endpoint}/paciente/${id}`, {
        nombres: nombres,
        apellidos: apellidos,
        telefono: telefono,
        fecha_nacimiento: fecha_nacimiento,
        ci: ci,
        sexo: sexo,
        direccion: direccion,
      })
      .then(function () {
        window.alert("Datos modificados correctamente");
        navigate(-1);
      })
      .catch(function (error) {
        window.alert("Hubo un error guardando los datos");
        console.log(error);
      });
  };

  return (
    <NavBar>
      <div>EditarPaciente</div>
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
          onChange={(e) => setNombres(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="apellidos"
          label="Apellidos"
          variant="outlined"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <br />
        <TextField
          id="telefono"
          label="Telefono"
          variant="outlined"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <br />
        <TextField
          id="fecha_nacimiento"
          label="Telefono"
          variant="outlined"
          value={fecha_nacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="carnet"
          label="Carnet"
          variant="outlined"
          value={ci}
          onChange={(e) => setCi(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <br />
        <TextField
          id="sexo"
          label="Sexo"
          variant="outlined"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <br />
        <TextField
          id="direccion"
          label="Direccion"
          variant="outlined"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <br />
        <Button
          variant="contained"
          color="warning"
          onClick={guardarDatosPaciente}
        >
          Guardar datos paciente
        </Button>
      </Box>
    </NavBar>
  );
};
