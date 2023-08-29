import React, { useState } from "react";
import NavBar from "../../estructura/NavBar";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const endpoint = "http://localhost:8000/api";

const UsoGabinete = () => {
  const navigate = useNavigate();
  const [existencias, setExistencias] = useState("");
  const [precio_compra, setPrecio_compra] = useState("");
  const { id } = useParams();

  const guardarIngresoUso = async () => {
    try {
      await axios.post(`${endpoint}/ingreso_producto_uso`, {
        fecha_ingreso: new Date().toISOString().slice(0, 10),
        existencias: existencias,
        precio_compra: precio_compra,
        productos_uso_id: id,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NavBar>
      <h1>Registro - Compra de producto</h1>
      <Card variant="outlined" sx={{ maxWidth: 500 }}>
        <CardContent>
          <TextField
            value={existencias}
            autoFocus
            margin="dense"
            id="Existencias"
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
            id="precioCompra"
            label="Precio de compra"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setPrecio_compra(e.target.value)}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="success"
            onClick={() => guardarIngresoUso()}
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

export default UsoGabinete;
