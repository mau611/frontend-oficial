import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";

const endpoint = "http://localhost:8000/api";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Agenda = () => {
  const [gabinetes, setGabinetes] = useState([]);
  const [myEvents, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [tipoConsultas, setTipoConsultas] = useState([]);
  const [estadoCitas, setEstadoCitas] = useState([]);
  const [paciente, setPaciente] = useState(null);
  const [tipoConsulta, setTipoConsulta] = useState(null);
  const [estadoCita, setEstadoCita] = useState(null);
  const [detalleTratamiento, setDetalleTratamiento] = useState("")
  const [detalleEvento, setDetalleEvento] = useState("")

  const handleClickOpen = (detallesEvento) => {
    setDetalleEvento(detallesEvento);
    setOpen(true);
  };

  const handleClose = () => {
    setPaciente("");
    setTipoConsulta("");
    setEstadoCita("");
    setDetalleTratamiento("");
    setDetalleEvento("");
    setOpen(false);
  };

  const getGabinetes = async () => {
    const response = await axios.get(`${endpoint}/consultorios`);
    setGabinetes(response.data);
  };
  const getTipoConsultas = async () => {
    const response = await axios.get(`${endpoint}/tipoConsultas`);
    setTipoConsultas(response.data);
  };
  const getPacientes = async () => {
    const response = await axios.get(`${endpoint}/pacientes`);
    setPacientes(response.data);
  };
  const getEstadoCitas = async () => {
    const response = await axios.get(`${endpoint}/estadoCitas`);
    setEstadoCitas(response.data);
  };

  useEffect(() => {
    getGabinetes();
    getPacientes();
    getTipoConsultas();
    getEstadoCitas();
  }, []);

  const localizer = momentLocalizer(moment);
  const handleSelectSlot = useCallback(
    ({ start, end, title, resourceId }) => {
      handleClickOpen({ start, end, resourceId });
      //const title = window.prompt("Nombre evento");
      //if (title) {
      //  setEvents((prev) => [...prev, { start, end, title, resourceId}]);
      //  console.log(start);
      //}
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );
  const handleGuardar = async () => {
    const p = ""+paciente;
    const tc = ""+tipoConsulta;
    const ec = ""+estadoCita;
    await axios.post(`${endpoint}/consulta`, {
      title: detalleTratamiento,
      start: detalleEvento.start,
      end: detalleEvento.end,
      estado: estadoCita,
      paciente_id: p.split[0],
      tipoConsulta_id: tc.split[0],
      estadoConsulta_id: ec.split[0],
    });
    console.log(paciente,detalleTratamiento,tipoConsulta,estadoCita,detalleEvento)
    handleClose()
  };
  return (
    <Fragment>
      <Calendar
        resourceTitleAccessor={"nombre"}
        resources={gabinetes}
        events={myEvents}
        defaultDate={defaultDate}
        defaultView={Views.DAY}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelectSlot}
        style={{ height: 700 }}
        selectable
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Agendar cita a Paciente"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            En esta ventana de dialogo podr&aacute;s agendar una cita
          </DialogContentText>
          <br />
          <Autocomplete
            freeSolo
            id="pacientes"
            value={paciente}
            onChange={(e, value) => setPaciente(value)}
            disableClearable
            options={pacientes.map(
              (option) =>
                option.id + " -  " + option.nombres + " " + option.apellidos
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Paciente"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
          <br />
          <TextField
            onChange={(e)=>setDetalleTratamiento(e.target.value)}
            value={detalleTratamiento}
            id="detallesTratamiento"
            name="detalles"
            placeholder="Mencione los detalles del tratamiento"
            multiline
            fullWidth
          />
          <br />
          <br />
          <Autocomplete
            freeSolo
            id="TipoConsulta"
            value={tipoConsulta}
            onChange={(e, value) => setTipoConsulta(value)}
            disableClearable
            options={tipoConsultas.map(
              (option) => option.id + " -  " + option.nombre
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo consulta"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
          <br />
          <Autocomplete
            freeSolo
            id="TipoConsulta"
            value={estadoCita}
            onChange={(e, value) => setEstadoCita(value)}
            disableClearable
            options={estadoCitas.map(
              (option) => option.id + " -  " + option.estado
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Estado de la cita"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleGuardar}>Guardar Cita</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default Agenda;
