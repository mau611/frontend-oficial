import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import React from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const actions = [
  { icon: <AssignmentIcon />, name: "Agregar Diagnostico", option: 1 },
  { icon: <FormatListNumberedIcon />, name: "Agregar Tratamiento", option: 2 },
];

const endpoint = "http://localhost:8000/api";

const DetallesPaciente = ({ diagnosticos, paciente_id }) => {
  const [open, setOpen] = React.useState(false);
  const [dx, setDiagnostico] = React.useState("");
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const agregar = (opcion) => {
    if (opcion == 1) {
      setOpen(!open);
    }
  };
  const guardarDiagnostico = async () => {
    await axios
      .post(`${endpoint}/diagnostico`, {
        diagnostico: dx,
        paciente_id: paciente_id,
      })
      .then(function () {
        window.alert("Exito");
        setDiagnostico("");
        setOpen(!open);
        navigate(0);
      })
      .catch(function () {
        window.alert("error");
        setDiagnostico("");
        setOpen(!open);
      });
  };
  return (
    <div style={{ textAlign: "justify" }}>
      <h4>Diagnostico y tratamientos del paciente</h4>
      <div>
        <Grid container spacing={2}>
          {diagnosticos?.map((diagnostico) => (
            <Grid item xs={4}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{diagnostico.diagnostico}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </div>
      <div>
        <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => agregar(action.option)}
              />
            ))}
          </SpeedDial>
        </Box>
      </div>
      <div>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>Ingrese un nuevo diagnostico</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="diagnostico"
              label="Paciente con:"
              type="text"
              fullWidth
              variant="standard"
              value={dx}
              onChange={(e) => setDiagnostico(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={guardarDiagnostico}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default DetallesPaciente;
