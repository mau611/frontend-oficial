import React, { useEffect, useState } from "react";
import { DataGrid, esES } from '@mui/x-data-grid';
import NavBar from "../estructura/NavBar";
import axios from "axios";

const columnas = [
  { field: "id", headerName: "Historia", width: 70 },
  { field: "nombres", headerName: "Nombres", width: 200 },
  { field: "apellidos", headerName: "Apellidos", width: 200 },
  { field: "telefono", headerName: "Telefono", width: 130 },
  { field: "fecha_nacimiento", headerName: "Fecha de nacimiento", width: 160 },
  { field: "ci", headerName: "Carnet", width: 130 },
  { field: "sexo", headerName: "Sexo", width: 130 },
  { field: "direccion", headerName: "Direccion", width: 400 },
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
      <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        onRowClick={(e)=>window.open(`/paciente/${e.row.id}`,"_blank")}
        rows={pacientes}
        columns={columnas}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
    </NavBar>
  );
};

export default Pacientes;
