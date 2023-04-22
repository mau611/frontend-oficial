import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Columnas = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nombre", headerName: "Tipo de consulta", width: 130 },
  { field: "color", headerName: "Color", width: 130 },
];

const endpoint = "www.shantispawellnesslife.com/api";

const CrearTratamientos = () => {
  const [state, setState] = useState({
    nombre: "",
    color: "",
  });
  const handleChange = (value, name) => {
    console.log(value);
    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setState({
      nombre: "",
      color: "",
    });
    setOpen(false);
  };

  const [tipoConsultas, setTipoConsultas] = useState([]);
  useEffect(() => {
    getTipoConsultas();
  }, []);

  const getTipoConsultas = async () => {
    const response = await axios.get(`${endpoint}/tipoConsultas`);
    setTipoConsultas(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `${endpoint}/tipoConsulta`,
      {
        nombre: state.nombre,
        color: state.color,
      },
    );
    navigate(0);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={tipoConsultas}
        columns={Columnas}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Agregar Tipo de consulta
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Creando Tipo de Consulta</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              value={state.nombre}
              margin="dense"
              id="nombre"
              label="Tipo Consulta"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "nombre")}
            />
            <TextField
              autoFocus
              margin="dense"
              id="color"
              label="Color"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "color")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSubmit}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default CrearTratamientos;
