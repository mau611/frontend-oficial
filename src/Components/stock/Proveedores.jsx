import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Columnas = [
  { field: "id", headerName: "ID" },
  { field: "nombre", headerName: "Proveedor", width: 200 },
  { field: "contacto", headerName: "Contacto", width: 200 },
  { field: "accion", headerName: "accion", width: 200 },
];

const endpoint = "https://api.shantispawellnesslife.com/api";

const Proveedores = () => {
  const [state, setState] = useState({
    nombre: "",
    contacto: "",
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
    });
    setOpen(false);
  };

  const [proveedores, setProveedores] = useState([]);
  useEffect(() => {
    getProveedores();
  }, []);

  const getProveedores = async () => {
    const response = await axios.get(`${endpoint}/proveedores`);
    setProveedores(response.data);
    console.log(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${endpoint}/proveedor`, {
      nombre: state.nombre,
      contacto: state.contacto,
    });
    navigate(0);
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <br />
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="sticky table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Proveedor</TableCell>
                <TableCell>Contacto</TableCell>
                <TableCell>Accion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {proveedores.map((proveedor) => (
                <TableRow
                  key={proveedor.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {" "}
                    {proveedor.id}{" "}
                  </TableCell>
                  <TableCell align=""> {proveedor.nombre} </TableCell>
                  <TableCell align=""> {proveedor.contacto} </TableCell>
                  <TableCell>
                    <IconButton aria-label="delete">
                      <EditIcon color="secondary" />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <br />
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Agregar proveedor
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Agregar Proveedor</DialogTitle>
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
            <TextField
              autoFocus
              value={state.contacto}
              margin="dense"
              id="contacto"
              label="Contacto"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "contacto")}
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

export default Proveedores;
