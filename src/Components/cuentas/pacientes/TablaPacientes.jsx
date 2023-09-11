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
import React, { useEffect, useState } from "react";

const endpoint = "http://scapi.shantispawellnesslife.com/api";

const TablaPacientes = () => {
  const [facturas, setFacturas] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [cont, setCont] = useState(0);
  useEffect(() => {
    getFacturas();
  }, []);

  const getFacturas = async () => {
    const response = await axios.get(`${endpoint}/facturas`);
    console.log(response.data);
    setFacturas(response.data[0]);
    setDetalles(response.data[1]);
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo de cita</TableCell>
              <TableCell>Importe</TableCell>
              <TableCell>Pagado</TableCell>
              <TableCell>Forma de pago</TableCell>
              <TableCell>Notas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facturas.map((factura) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                align="right"
              >
                <TableCell component="th" scope="row">
                  {factura.consulta.paciente.nombres +
                    " " +
                    factura.consulta.paciente.apellidos}
                </TableCell>
                <TableCell component="th" scope="row">
                  {factura.consulta.tipo_consulta.nombre}
                </TableCell>
                <TableCell component="th" scope="row">
                  {factura.total}
                </TableCell>
                <TableCell component="th" scope="row">
                  {factura.estado_pago}
                </TableCell>
                <TableCell component="th" scope="row">
                  {factura.forma_pago}
                </TableCell>
                <TableCell component="th" scope="row">
                  {factura.forma_pago == "Tarjeta"
                    ? factura.digitos_tarjeta
                    : factura.detalles_pago}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <br />
          <div>
            {"Total Citas: " +
              detalles[0] +
              " Bs" +
              "  - Efectivo: " +
              detalles[1] +
              " Bs" +
              "  - Transferencias: " +
              detalles[2] +
              " Bs" +
              "  - Pagos Qr: " +
              detalles[3] +
              " Bs" +
              "  - Tarjetas: " +
              detalles[4] +
              " Bs"}
          </div>
        </TableFooter>
      </TableContainer>
    </div>
  );
};

export default TablaPacientes;
