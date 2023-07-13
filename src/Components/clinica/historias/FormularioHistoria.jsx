import React from "react";
import { Suspense, useState } from "react";
import { fetchData } from "../../../scripts/FetchData";
import { Autocomplete, TextField } from "@mui/material";

const apiData = fetchData("https://stilettoapi.com/api/pacientes");

const FormularioHistoria = () => {
  const [paciente, setPaciente] = useState(null);
  const pacientes = apiData.leer();
  return (
    <div>
      Formulario Historias
      <br />
      <Autocomplete
        required
        freeSolo
        id="pacientes"
        value={paciente}
        onChange={(e, value) => setPaciente(value)}
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
        {paciente}
      </div>
    </div>
  );
};

export default FormularioHistoria;
