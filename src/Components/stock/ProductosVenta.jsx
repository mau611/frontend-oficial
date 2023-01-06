import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { Fragment, useState, setState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Columnas = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "Nombre", headerName: "Producto" },
  { field: "descripcion", headerName: "Descripcion" },
  { field: "proveedor", headerName: "Proveedor" },
  { field: "fechaIngreso", headerName: "Fecha ingreso", width: 200 },
  { field: "precioCompra", headerName: "Precio Compra", width: 200 },
  { field: "precioVenta", headerName: "Precio Venta", width: 200 },
  { field: "cantidad", headerName: "existencias", width: 200 },
  { field: "acciones", headerName: "Acciones", width: 200 },
];

const endpoint = "http://localhost:8000/api";

const ProductosVenta = () => {
  const [state, setState] = useState({
    nombre: "",
    descripcion: "",
    proveedor: "",
    fechaIngreso: new Date().toISOString().slice(0, 10),
    precioCompra: "",
    precioVenta: "",
    cantidad: "",
  });
  const [proveedores, setProveedores] = useState([]);
  const [datos, setDatos] = useState([]);
  const [productos, setProductos] = useState([]);
  const dataFetchedRef = useRef(false);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getProductos();
    getProveedores()
  }, []);

  const getProductos = async () => {
    const response = await axios.get(`${endpoint}/productos`);
    setProductos(response.data);
    console.log(response.data);
    response.data.map((p) => {
      setDatos((dat) => [
        ...dat,
        {
          id: p.id,
          Nombre: p.Nombre,
          descripcion: p.descripcion,
          proveedor: p.proveedor.nombre,
          fechaIngreso: obtenerDatos(p.ingresos)[0].split("-").reverse().join("-"),
          precioCompra: obtenerDatos(p.ingresos)[1],
          precioVenta: obtenerDatos(p.ingresos)[2],
          cantidad: obtenerDatos(p.ingresos)[3],
        },
      ]);
    });
  };

  const handleChange = (value, name) => {
    console.log(value)
    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const getProveedores = async () => {
    const response = await axios.get(`${endpoint}/proveedores`);
    setProveedores(response.data);
  };

  const obtenerDatos = (ingresos, campo) => {
    let dato = [];
    ingresos.map((ingreso)=>{
      console.log(ingreso)
      dato.push(ingreso.fecha)
      dato.push(ingreso.PrecioCompra)
      dato.push(ingreso.PrecioVenta)
      dato.push(ingreso.cantidad)
    })
    return dato
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setState({
      nombre: "",
      descripcion: "",
      proveedor: "",
      fechaIngreso: new Date().toISOString().slice(0, 10),
      precioCompra: "",
      precioVenta: "",
      cantidad: "",
    });
    setOpen(false);
  };

  const handleAgregarProducto = async (e) =>{
    e.preventDefault();
    await axios.post(
      `${endpoint}/producto`,
      {
        nombre: state.nombre,
        descripcion: state.descripcion,
        proveedor: state.proveedor.split(" ")[0],
        fechaIngreso: state.fechaIngreso,
        precioCompra: state.precioCompra,
        precioVenta: state.precioVenta,
        cantidad: state.cantidad,
      },
    );
    navigate(0);
  }
  return (
    <Fragment>
      <div>Productos Venta</div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={Columnas}
          rows={datos}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Agregar Producto
        </Button>
        <Button variant="outlined" onClick={handleClickOpen}>
          Actualizar Producto
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Creacion de producto</DialogTitle>
          <DialogContent>
            <TextField
              value={state.nombre}
              autoFocus
              margin="dense"
              id="nombre"
              label="Nombre"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "nombre")}
            />
            <TextField
              value={state.descripcion}
              autoFocus
              margin="dense"
              id="desc"
              label="Descripcion"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "descripcion")}
            />
            <br />
            <Autocomplete
              clearOnEscape
							required
							freeSolo
							id="proveedores"
							value={state.proveedor}
							onChange={(e, value) => handleChange(value, "proveedor")}
							disableClearable
							options={proveedores.map(
								(option) =>
									option.id + " -  " + option.nombre
							)}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Proveedor"
									InputProps={{
										...params.InputProps,
										type: "search",
									}}
                  variant="standard"
								/>
							)}
						/>
            <TextField
              value={state.precioCompra}
              autoFocus
              margin="dense"
              id="compra"
              label="Precio Compra"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "precioCompra")}
            />
            <TextField
              value={state.precioVenta}
              autoFocus
              margin="dense"
              id="venta"
              label="Precio Venta"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "precioVenta")}
            />
            <TextField
              value={state.cantidad}
              autoFocus
              margin="dense"
              id="cantidad"
              label="Cantidad"
              type="number"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e.target.value, "cantidad")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleAgregarProducto}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>
  );
};

export default ProductosVenta;
