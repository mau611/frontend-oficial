import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const endpoint = "http://localhost:8000/api";


const Filiacion = ({ id,  nombres, apellidos, telefono, ci, sexo, direccion }) => {
  const navigate = useNavigate();
  const [nombre, setNombres] = useState(nombres);
  const [apellido, setApellidos] = useState(apellidos);
  const [telef, setTelefono] = useState(telefono);
  const [carnet, setCi] = useState(ci);
  const [sex, setSexo] = useState(sexo);
  const [direc, setDireccion] = useState(direccion);
  const [editar, setEditar] = useState(true);

  const guardarDatosPaciente = async () => {
    await axios.post(`${endpoint}/paciente/${id}`, {
      nombres: nombre,
      apellidos: apellido,
      telefono: telef,
      ci: carnet,
      sexo: sex,
      direccion: direc,
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
  }

  return (
    <div style={{ textAlign: "justify" }}>
      <h3>Datos Personales</h3>
      <div style={{ textAlign: "left" }}>
        <Button color="secondary" onClick={() => setEditar(!editar)}>
          {" "}
          {editar ? "Editar informacion" : "Cancelar Edicion"}{" "}
        </Button>
      </div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "350px" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Nombres"
          variant="outlined"
          disabled={editar}
          value={nombres}
          InputLabelProps={{ shrink: true }}
          onChange={(e)=>setNombres(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Apellidos"
          variant="outlined"
          disabled={editar}
          value={apellidos}
          InputLabelProps={{ shrink: true }}
          onChange={(e)=>setApellidos(e.target.value)}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Telefono"
          variant="outlined"
          disabled={editar}
          value={telefono}
          InputLabelProps={{ shrink: true }}
          onChange={(e)=>setTelefono(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Carnet"
          variant="outlined"
          disabled={editar}
          value={ci}
          InputLabelProps={{ shrink: true }}
          onChange={(e)=>setCi(e.target.value)}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Sexo"
          variant="outlined"
          disabled={editar}
          value={sexo}
          InputLabelProps={{ shrink: true }}
          onChange={(e)=>setSexo(e.target.value)}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Direccion"
          variant="outlined"
          disabled={editar}
          value={direccion}
          InputLabelProps={{ shrink: true }}
          onChange={(e)=>setDireccion(e.target.value)}
        />
        <br />
        <Button variant="contained" color="warning" disabled={editar} onClick={()=>guardarDatosPaciente()}>
          Guardar
        </Button>
      </Box>
    </div>
  );
};

export default Filiacion;
