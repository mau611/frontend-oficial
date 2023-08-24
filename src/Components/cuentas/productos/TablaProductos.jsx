import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const endpoint = "https://api.shantispawellnesslife.com/api";

const TablaProductos = () => {
  const [ventas, setVentas] = useState([]);
  const [detalles, setDetalles] = useState([]);
  useEffect(() => {
    getVentas();
  }, []);
  const getVentas = async () => {
    const response = await axios.get(`${endpoint}/ventas`);
    console.log(response.data);
    setVentas(response.data[0]);
    setDetalles(response.data[1]);
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Importe</TableCell>
              <TableCell>Pagado</TableCell>
              <TableCell>Forma de pago</TableCell>
              <TableCell>Notas</TableCell>
            </TableRow>
          </TableHead>
          {ventas.map((venta) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              align="right"
            >
              <TableCell component="th" scope="row">
                {venta.paciente.nombres + " " + venta.paciente.apellidos}
              </TableCell>
              <TableCell component="th" scope="row">
                {venta.total}
              </TableCell>
              <TableCell component="th" scope="row">
                {venta.estado}
              </TableCell>
              <TableCell component="th" scope="row">
                {venta.tipo_pago}
              </TableCell>
              <TableCell component="th" scope="row">
                {venta.detalles_pago}
              </TableCell>
            </TableRow>
          ))}
        </Table>
        <TableFooter>
          <br />
          <div>
          {"Total ventas: " +
              detalles[0] +
              " Bs" +
              "  - Efectivo: " +
              detalles[1] +
              " Bs" +
              "  - Transferencias: " +
              detalles[2] +
              " Bs" +
              "  - Tarjetas: " +
              detalles[3] +
              " Bs" }
          </div>
        </TableFooter>
      </TableContainer>
    </div>
  );
};

export default TablaProductos;
