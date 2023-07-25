import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import React from "react";

const Bonos = ({ bonos }) => {
  const theme = useTheme();
  return (
    <div>
      Bonos
      <br />
      <Grid container spacing={2}>
        {bonos?.map((bono) => (
          <Grid item xs={4}>
            <Card sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {bono.nombre}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Precio: {bono.precio}
                    <br />
                    Restantes: {bono.restantes}
                  </Typography>
                </CardContent>
                
              </Box>
              
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Bonos;
