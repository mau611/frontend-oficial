import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const TablaProductos = ({ productos, total }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead style={{}}>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell align="right">Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((producto) => (
            <TableRow key={producto.id}>
              <TableCell component="th" scope="row">
                {producto.producto.Nombre}
              </TableCell>
              <TableCell align="right">{producto.PrecioVenta}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaProductos;
