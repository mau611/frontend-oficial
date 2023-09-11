import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Link } from "react-router-dom";

const endpoint = "http://scapi.shantispawellnesslife.com/api";

const ProductosUso = () => {
  const [productos, setProductos] = useState([]);
  const [open, setOpen] = useState(false);
  const [openActualizar, setOpenActualizar] = useState(false);
  const [productos_uso, setProductos_uso] = useState("");
  const [existencias, setExistencias] = useState("");
  const [precio_compra, setPrecio_compra] = useState("");

  const handleClose = () => {
    setProductos_uso("");
    setExistencias("");
    setPrecio_compra("");
    setOpen(false);
    setOpenActualizar(false);
  };
  useEffect(() => {
    getProductos();
  }, []);
  const getProductos = async () => {
    const response = await axios.get(`${endpoint}/materiales`);
    setProductos(response.data);
  };
  const guardarProducto = async () => {
    try {
      await axios.post(`${endpoint}/material_uso`, {
        productos_uso: productos_uso,
        fecha_ingreso: new Date().toISOString().slice(0, 10),
        existencias: existencias,
        precio_compra: precio_compra,
      });
      handleClose();
      getProductos();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Uso Gabinete</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Agregar Compra</TableCell>
              <TableCell>Fecha Ingreso</TableCell>
              <TableCell>Existencias</TableCell>
              <TableCell>Precio compra</TableCell>
              <TableCell>Consumir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((producto) => (
              <TableRow
                key={producto.nombre}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {producto.id}
                </TableCell>
                <TableCell>{producto.productos_uso}</TableCell>
                <TableCell>
                  <Link to={`/actualizar_producto_uso/${producto.id}`}>
                    <AddToPhotosIcon />
                  </Link>
                </TableCell>
                <TableCell>
                  {producto.ingresos_uso.map((ingreso) => (
                    <p>{ingreso.fecha_ingreso}</p>
                  ))}
                </TableCell>
                <TableCell>
                  {producto.ingresos_uso.map((ingreso) => (
                    <p>{ingreso.existencias}</p>
                  ))}
                </TableCell>
                <TableCell>
                  {producto.ingresos_uso.map((ingreso) => (
                    <p>{ingreso.precio_compra}</p>
                  ))}
                </TableCell>
                <TableCell>
                  {producto.ingresos_uso.map((ingreso) => (
                    <div>
                      <Link>
                        <RemoveCircleOutlineIcon fontSize="small" />
                      </Link>
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <hr />
      <Button color="success" variant="outlined" onClick={() => setOpen(true)}>
        Registrar Producto
      </Button>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Creacion de producto</DialogTitle>
          <DialogContent>
            <TextField
              value={productos_uso}
              autoFocus
              margin="dense"
              id="nombre"
              label="Nombre"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setProductos_uso(e.target.value)}
            />
            <TextField
              value={existencias}
              autoFocus
              margin="dense"
              id="existencias"
              label="Existencias"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setExistencias(e.target.value)}
            />
            <TextField
              value={precio_compra}
              autoFocus
              margin="dense"
              id="compra"
              label="Precio Compra"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setPrecio_compra(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={guardarProducto}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductosUso;
