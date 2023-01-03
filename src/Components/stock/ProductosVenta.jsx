import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { Fragment, useState, setState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Columnas = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nombre", headerName: "Producto", },
  { field: "descripcion", headerName: "Descripcion",  },
  { field: "proveedor", headerName: "Proveedor",},
  { field: "fechaIngreso", headerName: "Fecha ingreso", width: 200 },
  { field: "precioCompra", headerName: "Precio Compra", width: 200 },
  { field: "precioVenta", headerName: "Precio Venta", width: 200 },
  { field: "cantidad", headerName: "existencias", width: 200 },
  { field: "acciones", headerName: "Acciones", width: 200 },
];

const endpoint = "http://localhost:8000/api";

const ProductosVenta = () => {
  const [proveedores, setProveedores] = useState([]);
  useEffect(() => {
    getProveedores();
  }, []);

  const getProveedores = async () => {
    const response = await axios.get(`${endpoint}/proveedores`);
    setProveedores(response.data);
  };
  
  const [open, setOpen] = useState(false);
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
  return (
    <Fragment>
      <div>Productos Venta</div>
      <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={{}}
        columns={Columnas}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      </div>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Agregar Producto
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Creacion de producto</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="nombre"
              label="Nombre"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="desc"
              label="Descripcion"
              type="text"
              fullWidth
              variant="standard"
            />
            
          </DialogContent>
          <DialogActions>
            <Button >Cancelar</Button>
            <Button >Guardar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>
  )
}

export default ProductosVenta