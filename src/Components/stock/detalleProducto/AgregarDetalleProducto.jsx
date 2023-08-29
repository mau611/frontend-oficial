import React from "react";
import NavBar from "../../estructura/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const endpoint = "http://localhost:8000/api";

const AgregarDetalleProducto = () => {
  const { id } = useParams();
  const [precioCompra, setPrecioCompra] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [factura, setFactura] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const navigate = useNavigate();

  const registrarDetalle = async () => {
    try {
      await axios.post(`${endpoint}/detalleProductosVentas`, {
        fecha: new Date().toISOString().slice(0, 10),
        PrecioCompra: precioCompra,
        PrecioVenta: precioVenta,
        cantidad: cantidad,
        factura: factura,
        vencimiento: vencimiento,
        producto_id: id,
      });
      navigate(-1);
    } catch (error) {
      console.log(error.data);
    }
  };

  return (
    <NavBar>
      <h1>Registro - Compra de producto</h1>
      <Card variant="outlined" sx={{ maxWidth: 500 }}>
        <CardContent>
          <TextField
            value={precioCompra}
            autoFocus
            margin="dense"
            id="compra"
            label="Precio Compra"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setPrecioCompra(e.target.value)}
          />
          <TextField
            value={precioVenta}
            autoFocus
            margin="dense"
            id="venta"
            label="Precio Venta"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setPrecioVenta(e.target.value)}
          />
          <TextField
            value={cantidad}
            autoFocus
            margin="dense"
            id="cantidad"
            label="Cantidad"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setCantidad(e.target.value)}
          />
          <TextField
            value={factura}
            autoFocus
            margin="dense"
            id="factura"
            label="Factura Nro:"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setFactura(e.target.value)}
          />
          <TextField
            value={vencimiento}
            InputLabelProps={{ shrink: true }}
            autoFocus
            margin="dense"
            id="vencimiento"
            label="Vencimiento"
            type="date"
            fullWidth
            variant="standard"
            onChange={(e) => setVencimiento(e.target.value)}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="success"
            onClick={() => registrarDetalle()}
          >
            Registrar Compra
          </Button>
          <br />
          <br />
          <Button variant="outlined" color="error" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
        </CardContent>
      </Card>
    </NavBar>
  );
};

export default AgregarDetalleProducto;
