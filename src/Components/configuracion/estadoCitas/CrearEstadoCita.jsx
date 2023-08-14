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
  { field: "estado", headerName: "Estado consulta", width: 130 },
];

const endpoint = "https://stilettoapi.com/api";

const CrearEstadoCita = () => {
  const [state, setState] = useState({
    estado: "",
  });
  const handleChange = (value, name) => {
    console.log(value)
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
      estado: "",
    });
    setOpen(false);
  };

  const [estados, setEstados] = useState([]);
  useEffect(() => {
    getEstados();
  }, []);

  const getEstados = async () => {
    const response = await axios.get(`${endpoint}/estadoCitas`);
    setEstados(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `${endpoint}/estadoCita`,
      {
        estado: state.estado,
      },
    );
    navigate(0);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={estados}
        columns={Columnas}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Agregar Estado de cita
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Creacion del Estado de una cita</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              value={state.estado}
              margin="dense"
              id="estado"
              label="Estado de cita"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "estado")}
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

export default CrearEstadoCita;
