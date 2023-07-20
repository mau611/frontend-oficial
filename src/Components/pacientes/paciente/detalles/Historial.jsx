import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

const Historial = ({ citas, diagnosticos }) => {
  console.log(citas);
  const mostrar = (cadena1, cadena2, cadena3) =>{
    if(cadena1 && cadena2 != ""){
      return (<div>
        <p><strong>Evaluacion Objetiva:</strong> {cadena1}</p>
        <p><strong>Evaluacion Subjetiva:</strong> {cadena2}</p>
      </div>)
    }else if(cadena3 != "" ){
      return <p><strong>Evolucion:</strong> {cadena3}</p>
    }
  }
  return (
    <div>
      Historial
      <br />
      {citas?.map((cita) => (
        <Accordion style={{ textAlign: "justify" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              Fecha Cita:{" "}
              {new Date("" + cita.start).toLocaleDateString("en-GB")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>Dx:</strong>
              {diagnosticos?.map((diagnostico) => diagnostico.diagnostico)}
              <br />
              {cita.historias?.map((historia) => (
                <div>
                  {mostrar(historia.evaluacion_objetiva,historia.evaluacion_subjetiva, historia.evolucion)}
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
