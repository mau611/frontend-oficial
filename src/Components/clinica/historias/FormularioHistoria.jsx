import React, { useRef } from "react";
import { Suspense, useState } from "react";
import { fetchData } from "../../../scripts/FetchData";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";


const endpoint = "https://stilettoapi.com/api";

const FormularioHistoria = () => {
  const dataFetchedRef = useRef(false);
  const clickRef = useRef(null);
  const [paciente, setPaciente] = useState([]);
  const [pacientes,setPacientes] = useState([]);
  const [citas,setCitas] = useState([])
  const [cita,setCita] = useState("")

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getPacientes();
    window.clearTimeout(clickRef?.current);
  }, []);
  

  const getPacientes = async () => {
    const response = await axios.get(`${endpoint}/pacientes`);
    setPacientes(response.data)
  };

  const getCitas = async (value) => {
    setCitas([])
    setCita()
    setPaciente(value)
    const id = value.split(" ")[0]
    const response = await axios.get(`${endpoint}/paciente/${id}`);
    setCitas(response.data.citas)
  };
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
        Seleccione una Fecha
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
            option.id + " - Fecha de la cita:  " + ((new Date(""+option.start).toLocaleDateString('en-GB')))
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
    </div>
  );
};

export default FormularioHistoria;
