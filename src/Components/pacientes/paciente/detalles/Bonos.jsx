import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import shantiLogo from "./../../../../shanti card.png";

const Bonos = ({ bonos }) => {
  const theme = useTheme();
  console.log(bonos);
  return (
    <div>
      <h3>Bonos</h3>
      <br />
      <Grid container spacing={2}>
        {bonos?.map((bono) => {
          return (
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 150 }}
                  image={shantiLogo}
                  title="imagen bono"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {bono.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Usos: {bono.sesiones - bono.restantes} - Restantes:{" "}
                    {bono.restantes}
                    <br />
                    Precio: {bono.precio} Bs.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Bonos;
