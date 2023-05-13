import React, { useEffect, useState } from "react";
import { useDemoData } from "@mui/x-data-grid-generator";
import { DataGrid } from "@mui/x-data-grid";
import NavBar from "../estructura/NavBar";
import { Box } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

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
const endpoint = "https://stilettoapi.com/api";

export const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  useEffect(() => {
    getPacientes();
  }, []);

  const getPacientes = async () => {
    const response = await axios.get(`${endpoint}/pacientes`);
    setPacientes(response.data);
  };

  return (
    <NavBar>
      <h1>Lista de Pacientes</h1>
      <br />
      <div style={{ width: "100%" }}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Historia</th>
              <th scope="col">Nombre</th>
              <th scope="col">Telefono</th>
              <th scope="col">Carnet de identidad</th>
              <th scope="col">Sexo</th>
              <th scope="col">Direccion</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente)=>
              <tr>
                <th scope="row">{paciente.id}</th>
                <td><Link to={`/paciente/${paciente.id}`}>{paciente.nombres} {paciente.apellidos}</Link></td>
                <td>{paciente.telefono}</td>
                <td>{paciente.ci}</td>
                <td>{paciente.sexo}</td>
                <td>{paciente.direccion}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </NavBar>
  );
};

export default Pacientes;
