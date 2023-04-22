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
  { field: "nombre", headerName: "Consultorio", width: 130 },
];

const endpoint = "www.shantispawellnesslife.com/api";

const Licenciados = () => {
  const [state, setState] = useState({
    nombre: "",
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
      nombre: "",
    });
    setOpen(false);
  };

  const [licenciados, setLicenciados] = useState([]);
  useEffect(() => {
    getLicenciados();
  }, []);

  const getLicenciados = async () => {
    const response = await axios.get(`${endpoint}/profesionales`);
    setLicenciados(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `${endpoint}/profesional`,
      {
        nombre: state.nombre,
      },
    );
    navigate(0);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={licenciados}
        columns={Columnas}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Agregar Licenciado
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Creacion de consultorio</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              value={state.nombre}
              margin="dense"
              id="nombre"
              label="Nombre"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "nombre")}
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

export default Licenciados;
