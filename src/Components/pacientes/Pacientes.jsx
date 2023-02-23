import React, { useEffect, useState } from "react";
import { useDemoData } from "@mui/x-data-grid-generator";
import { DataGrid } from "@mui/x-data-grid";
import NavBar from "../estructura/NavBar";
import { Box } from "@mui/material";
import axios from "axios";

const columnas = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nombres", headerName: "Nombres", width: 200 },
  { field: "apellidos", headerName: "Apellidos", width: 200 },
  { field: "telefono", headerName: "Telefono", width: 130 },
  { field: "fecha_nacimiento", headerName: "Fecha de nacimiento", width: 130 },
  { field: "ci", headerName: "Carnet", width: 130 },
  { field: "sexo", headerName: "Sexo", width: 130 },
  { field: "direccion", headerName: "Direccion", width: 300 },
];
const endpoint = "http://localhost:8000/api";


export const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  useEffect(() => {
    getPacientes();
  }, [])

  const getPacientes = async () => {
    const response = await axios.get(`${endpoint}/pacientes`);
    setPacientes(response.data);
  };
  
  
  return (
    <NavBar>
      <h1>Lista de Pacientes</h1>
      <br />
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={pacientes}
          columns={columnas}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </NavBar>
  );
};

export default Pacientes;
