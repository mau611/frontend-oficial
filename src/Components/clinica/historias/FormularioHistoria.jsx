import React, { useRef } from "react";
import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const endpoint = "http://localhost:8000/api";

const FormularioHistoria = () => {
  const navigate = useNavigate();
  const dataFetchedRef = useRef(false);
  const clickRef = useRef(null);
  const [paciente, setPaciente] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [citas, setCitas] = useState([]);
  const [cita, setCita] = useState("");
  const [opcionHistoria, setOpcionHistoria] = useState("nueva");

  const [diagnostico, setDiagnostico] = useState("");
  const [evaluacionObjetiva, setEvaluacionObjetiva] = useState("");
  const [evaluacionSubjetiva, setEvaluacionSubjetiva] = useState("");
  const [evolucion, setEvolucion] = useState("");
  

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getPacientes();
    window.clearTimeout(clickRef?.current);
  }, []);

  const getPacientes = async () => {
    const response = await axios.get(`${endpoint}/pacientes`);
    setPacientes(response.data);
  };

  const seleccionarFicha = (event) => {
    setDiagnostico("")
    setEvaluacionObjetiva("")
    setEvaluacionSubjetiva("")
    setEvolucion("")
    setOpcionHistoria(event.target.value);
  };

  const getCitas = async (value) => {
    setCitas([]);
    setCita();
    setPaciente(value);
    const id = value.split(" ")[0];
    const response = await axios.get(`${endpoint}/paciente/${id}`);
    setCitas(response.data.citas);
  };

  const llenarFicha = async () => {
    console.log(opcionHistoria,paciente, cita)
    console.log(diagnostico, evaluacionObjetiva, evaluacionSubjetiva)
    console.log(evolucion)
    await axios.post(`${endpoint}/historia`, {
      paciente_id: paciente.split(' ')[0],
      consulta_id: cita.split(' ')[0],
      diagnostico: diagnostico,
      evaluacion_objetiva: evaluacionObjetiva,
      evaluacion_subjetiva: evaluacionSubjetiva,
      evolucion: evolucion,
      opcion: opcionHistoria
    })
    .then(function(){
      window.alert("historia guardada de manera exitosa")
      navigate(0)
    }).catch(function(error){
      window.alert('Hubo un error guardando los datos')
      console.log(error)
    });
  }
  return (
    <div>
      Seleccione un paciente
      <br />
      <Autocomplete
        required
        freeSolo
        id="pacientes"
        value={paciente}
        onChange={(e, value) => getCitas(value)}
        disableClearable
        options={pacientes.map(
          (option) =>
            option.id + " -  " + option.nombres + " " + option.apellidos
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Paciente"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
      <br />
      <div>
        Elija una Fecha
        <br />
        <Autocomplete
          required
          freeSolo
          id="citas"
          value={cita}
          onChange={(e, value) => setCita(value)}
          disableClearable
          options={citas.map(
            (option) =>
              option.id +
              " - Fecha de la cita:  " +
              new Date("" + option.start).toLocaleDateString("en-GB")
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Seleccione la cita"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </div>
      <br />
      <div>
        Elige una opcion
        <br />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={opcionHistoria}
          onChange={seleccionarFicha}
        >
          <MenuItem value={"nueva"}>Nueva ficha</MenuItem>
          <MenuItem value={"evolucion"}>Evolucion</MenuItem>
        </Select>
      </div>
      <br />
      <div>
        {opcionHistoria == "nueva" ? (
          <Box
            component="form"
            noValidate
          >
            <TextField
              id="diagnostico"
              label="Diagnostico"
              fullWidth
              onChange={(e)=>setDiagnostico(e.target.value)}
            />
            <br /><br />
            <TextField
              id="evaluacionObjetiva-textarea"
              label="Evaluacion objetiva"
              maxRows={6}
              multiline
              fullWidth
              onChange={(e)=>setEvaluacionObjetiva(e.target.value)}
            />
            <br /><br />
            <TextField
              id="evaluacionSubjetiva-textarea"
              label="Evaluacion subjetiva"
              maxRows={6}
              multiline
              fullWidth
              onChange={(e)=>setEvaluacionSubjetiva(e.target.value)}
            />
          </Box>
        ) : (
          <Box
            component="form"
            noValidate
          >
            <TextField
              id="evolucion"
              label="Evolucion del paciente"
              rows={7}
              multiline
              fullWidth
              onChange={(e)=>setEvolucion(e.target.value)}
            />
          </Box>
        )}
        <br />
        <Button variant="contained" color="success" onClick={llenarFicha}>Guardar</Button>
      </div>
    </div>
  );
};

export default FormularioHistoria;
