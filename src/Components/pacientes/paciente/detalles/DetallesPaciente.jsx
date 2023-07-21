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
  InputLabel,
  MenuItem,
  Select,
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
import { FormControl } from "react-bootstrap";

const actions = [
  { icon: <AssignmentIcon />, name: "Agregar Diagnostico", option: 1 },
  { icon: <FormatListNumberedIcon />, name: "Agregar Tratamiento", option: 2 },
];

const endpoint = "http://localhost:8000/api";

const DetallesPaciente = ({ diagnosticos, paciente_id }) => {
  const [openDx, setOpenDx] = React.useState(false);
  const [openTx, setOpenTx] = React.useState(false);
  const [diagnostico, setDiagnostico] = React.useState("");
  const [tratamiento, setTratamiento] = React.useState("");
  const [dxId, setDxId] = React.useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    setOpenDx(false);
    setOpenTx(false);
  };

  const agregar = (opcion) => {
    if (opcion == 1) {
      setOpenDx(!openDx);
    } else {
      setOpenTx(!openTx);
    }
  };
  const guardarDiagnostico = async () => {
    await axios
      .post(`${endpoint}/diagnostico`, {
        diagnostico: diagnostico,
        paciente_id: paciente_id,
      })
      .then(function () {
        window.alert("Exito");
        setDiagnostico("");
        setOpenDx(!openDx);
        navigate(0);
      })
      .catch(function (error) {
        window.alert("error");
        setDiagnostico("");
        setOpenDx(!openDx);
      });
  };
  const guardarTratamiento = async () => {
    await axios
      .post(`${endpoint}/tratamiento`, {
        tratamiento: tratamiento,
        diagnostico_id: dxId,
      })
      .then(function () {
        window.alert("Exito");
        setTratamiento("");
        setDxId("");
        setOpenDx(!openDx);
        navigate(0);
      })
      .catch(function (error) {
        window.alert("error");
        console.log(error)
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
        <Dialog open={openDx} onClose={handleClose} fullWidth>
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
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={guardarDiagnostico}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog open={openTx} onClose={handleClose} fullWidth>
          <DialogTitle>Agregar Tratamiento</DialogTitle>
          <DialogContent>
            <InputLabel id="demo-simple-select-label">Diagnostico</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dxId}
              label="Tratamiento"
              onChange={(e) => setDxId(e.target.value)}
            >
              {diagnosticos?.map((diagnostico) => (
                <MenuItem value={diagnostico.id}>
                  {diagnostico.diagnostico}
                </MenuItem>
              ))}
            </Select>
            <TextField
              autoFocus
              margin="dense"
              id="diagnostico"
              label="Paciente con:"
              type="text"
              fullWidth
              variant="standard"
              multiline
              rows={5}
              value={tratamiento}
              onChange={(e) => setTratamiento(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={guardarTratamiento}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default DetallesPaciente;
