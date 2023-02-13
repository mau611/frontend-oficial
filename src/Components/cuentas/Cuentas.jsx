import { Box, Grid } from "@mui/material";
import React from "react";
import NavBar from "../estructura/NavBar";
import TablaPacientes from "./pacientes/TablaPacientes";
import TablaProductos from "./productos/TablaProductos";

const Cuentas = () => {
  return (
    <NavBar>
      <h1>Cuentas</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={6}>
            <h3>Cobro pacientes</h3>
            <TablaPacientes/>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <h3>Venta de productos</h3>
            <TablaProductos/>
          </Grid>
        </Grid>
      </Box>
    </NavBar>
  );
};

export default Cuentas;
