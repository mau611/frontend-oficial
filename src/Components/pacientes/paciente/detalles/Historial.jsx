import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

const Historial = ({ citas, diagnosticos }) => {
  console.log(citas);
  const mostrar = (cadena1, cadena2, cadena3) => {
    if (cadena1 && cadena2 != "") {
      return (
        <div>
          <p>
            <strong>Evaluacion Objetiva:</strong> {cadena1}
          </p>
          <p>
            <strong>Evaluacion Subjetiva:</strong> {cadena2}
          </p>
        </div>
      );
    } else if (cadena3 != "") {
      return (
        <p>
          <strong>Evolucion:</strong> {cadena3}
        </p>
      );
    }
  };
  return (
    <div style={{ textAlign: "justify" }}>
      <h5>Historial</h5>
      <strong>Diagnostico Medico:</strong> <br />
      {diagnosticos?.map((diagnostico) => diagnostico.diagnostico + "; ")}
      <br />
      {citas?.map((cita) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{color:"white"}}/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ backgroundColor: "#155E30", color:"white" }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  Paciente atendido en: {cita.consultorio.nombre}
                </Grid>
                <Grid item xs={4} style={{ textAlign: "right" }}>
                  Fecha: {new Date("" + cita.start).toLocaleDateString("en-GB")}
                </Grid>
              </Grid>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <strong>Detalle de consulta:</strong> {cita.title}
            <Typography>
              {cita.historias?.map((historia) => (
                <div>
                  {mostrar(
                    historia.evaluacion_objetiva,
                    historia.evaluacion_subjetiva,
                    historia.evolucion
                  )}
                </div>
              ))}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Historial;
