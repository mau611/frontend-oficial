import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Accordion from "react-bootstrap/Accordion";
import ButtonB from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
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
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NavBar from "../estructura/NavBar";
import { useNavigate } from "react-router-dom";
import DatosPaciente from "./ComponentesPaciente/DatosPaciente";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { CloseButton } from "react-bootstrap";
require("globalize/lib/cultures/globalize.culture.es");
const DragAndDropCalendar = withDragAndDrop(Calendar);

const endpoint = "http://localhost:8000/api";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const cultures = ["en", "en-GB", "es", "fr", "ar-AE"];
const lang = {
  en: null,
  "en-GB": null,
  es: {
    week: "Semana",
    work_week: "Semana de trabajo",
    day: "Día",
    month: "Mes",
    previous: "Atrás",
    next: "Adelante",
    today: "Hoy",
    agenda: "Lista de citas",
    noEventsInRange: "No existen citas en este intervalo.",

    showMore: (total) => `+${total} más`,
  },
  fr: {
    week: "La semaine",
    work_week: "Semaine de travail",
    day: "Jour",
    month: "Mois",
    previous: "Antérieur",
    next: "Prochain",
    today: `Aujourd'hui`,
    agenda: "Ordre du jour",

    showMore: (total) => `+${total} plus`,
  },
  "ar-AE": {
    week: "أسبوع",
    work_week: "أسبوع العمل",
    day: "يوم",
    month: "شهر",
    previous: "سابق",
    next: "التالي",
    today: "اليوم",
    agenda: "جدول أعمال",

    showMore: (total) => `+${total} إضافي`,
  },
};

const Agenda = () => {
  const [culture, setCulture] = useState("es");
  const [gabinetes, setGabinetes] = useState([]);
  const [myEvents, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [tipoConsultas, setTipoConsultas] = useState([]);
  const [estadoCitas, setEstadoCitas] = useState([]);
  const [paciente, setPaciente] = useState(null);
  const [tipoConsulta, setTipoConsulta] = useState(null);
  const [estadoCita, setEstadoCita] = useState("1 -  Por llegar");
  const [detalleTratamiento, setDetalleTratamiento] = useState("");
  const [detalleEvento, setDetalleEvento] = useState("");
  const dataFetchedRef = useRef(false);
  const [openDetallePaciente, setOpenDetallePaciente] = useState(false);
  const [auxPaciente, setAuxPaciente] = useState({});
  const [auxFacturas, setAuxFacturas] = useState([]);
  const [auxEstado, setAuxEstado] = useState({});
  const [cobroTratamientos, setCobroTratamientos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [cobro, setCobro] = useState(0);
  const [estadoPago, setEstadoPago] = useState("");
  const [detallesPago, setDetallesPago] = useState("");
  const [tipoDePago, setTipoDePago] = useState("");
  const [selectEventId, setSelectEventId] = useState(0);
  const [profesionales, setProfesionales] = useState([]);
  const [profesionalId, setProfesionalId] = useState("");

  //variables de bonos
  const [nombreBono, setNombreBono] = useState("");
  const [sesionesBono, setSesionesBono] = useState(0);
  const [costoBono, setCostoBono] = useState(0);
  const setValoresBono = (value, variable) => {
    if (variable == "nombreBono") {
      setNombreBono(value);
    } else if (variable == "sesionesBono") {
      setSesionesBono(value);
    } else if (variable == "costoBono") {
      setCostoBono(value);
    }
  };

  const crearBono = async () => {
    console.log("botohn clickeado Bonos");
    await axios.post(`${endpoint}/bono`, {
      nombre: nombreBono,
      sesiones: sesionesBono,
      precio: costoBono,
      restantes: sesionesBono,
      paciente_id: auxPaciente.id,
    });
    handleCloseDetallePaciente();
    navigate(0);
  };

  const consumirBono = async (bonoId) => {
    await axios.put(`${endpoint}/descontarBono/${bonoId}`, {
      bono_id: bonoId,
      consulta_id: selectEventId,
    });
    handleCloseDetallePaciente();
    navigate(0);
  };
  //fin bono

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      ...(event.estado.estado === "Por llegar" && {
        style: {
          backgroundColor: "#8fbc91",
        },
      }),
      ...(event.estado.estado === "En espera" && {
        style: {
          backgroundColor: "#f1ec7a",
          color: "#2a2a2a",
        },
      }),
      ...(event.estado.estado === "En consulta" && {
        style: {
          backgroundColor: "#f6a7b8",
          color: "#2a2a2a",
        },
      }),
      ...(event.estado.estado === "Finalizada" && {
        style: {
          backgroundColor: "#1d4d9f",
        },
      }),
      ...(event.estado.estado === "No asistencia" && {
        style: {
          background:
            "repeating-linear-gradient(45deg,#6991c7,#a3bded 1%,#6991c7 10%)",
          color: "#2a2a2a",
        },
      }),
      ...(event.estado.estado === "Reprogramada" && {
        style: {
          backgroundColor: "#f08838",
          color: "#2a2a2a",
        },
      }),
    }),
    []
  );

  const navigate = useNavigate();
  const clickRef = useRef(null);

  const borrarCita = async () => {
    await axios.delete(`${endpoint}/consulta/${selectEventId}`);
    navigate(0);
  };

  const handleClickOpen = (detallesEvento) => {
    setDetalleEvento(detallesEvento);
    setOpen(true);
  };
  const handleClickOpenDetallePaciente = (
    pacienteEvento,
    eventoId,
    estado,
    facturas
  ) => {
    setSelectEventId(eventoId);
    getPacienteCita(pacienteEvento);
    setOpenDetallePaciente(true);
    setAuxEstado(estado);
    setAuxFacturas(facturas);
  };

  const cambiarEstadoCita = async (estadoId) => {
    await axios.put(`${endpoint}/consulta/${selectEventId}/${estadoId}`, {
      eId: estadoId,
    });
    navigate(0);
  };

  const handleCloseDetallePaciente = () => {
    setOpenDetallePaciente(false);
    setAuxPaciente({});
    setCobroTratamientos([]);
    setCobro(0);
    setEstadoPago("");
    setDetallesPago("");
    setTipoDePago("");
    setSelectEventId(0);
  };

  const getPacienteCita = (paciente) => {
    setAuxPaciente(paciente);
  };

  const handleClose = () => {
    setPaciente("");
    setTipoConsulta("");
    setEstadoCita("");
    setDetalleTratamiento("");
    setDetalleEvento("");
    setAuxPaciente([]);
    setCobroTratamientos([]);
    setOpen(false);
    setProfesionalId("");
    setAuxFacturas([]);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    var valor = 0;
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
        servicios.map((serv) => {
          if (serv.id == options[i].value) {
            valor = valor + serv.costo;
          }
        });
      }
    }
    setCobroTratamientos(value);
    setCobro(valor);
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
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    console.log("effect");
    getGabinetes();
    getPacientes();
    getTipoConsultas();
    getEstadoCitas();
    getEventosBD();
    getServicios();
    getProfesionales();
    window.clearTimeout(clickRef?.current);
  }, []);

  const getProfesionales = async () => {
    const response = await axios.get(`${endpoint}/profesionales`);
    setProfesionales(response.data);
  };

  const getServicios = async () => {
    const response = await axios.get(`${endpoint}/servicios`);
    setServicios(response.data);
  };
  const getEventosBD = async () => {
    const response = await axios.get(`${endpoint}/consultas`);
    response.data.map((ev) => {
      setEvents((prev) => [
        ...prev,
        {
          start: new Date(ev.start),
          end: new Date(ev.end),
          title: ev.paciente.nombres + " " + ev.paciente.apellidos,
          resourceId: ev.consultorio_id,
          paciente: ev.paciente,
          evId: ev.id,
          facturas: ev.facturas,
          estado: ev.estado_cita,
        },
      ]);
    });
  };

  const localizer = momentLocalizer(moment);
  const handleSelectSlot = useCallback(
    ({ start, end, title, resourceId, facturas }) => {
      handleClickOpen({ start, end, resourceId, facturas });
    }
  );

  const { defaultDate, scrollToTime, messages } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
      messages: lang[culture],
    }),
    []
  );

  const onSelectEvent = useCallback((calEvent) => {
    console.log(calEvent);
    /**
     * Here we are waiting 250 milliseconds (use what you want) prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    handleClickOpenDetallePaciente(
      calEvent.paciente,
      calEvent.evId,
      calEvent.estado,
      calEvent.facturas
    );
  }, []);

  const realizarCobro = async () => {
    console.log("botohn clickeado");
    await axios.post(`${endpoint}/factura`, {
      total: cobro,
      estado_pago: estadoPago,
      forma_pago: tipoDePago,
      detalles_pago: detallesPago,
      consulta_id: selectEventId,
      tratamientos: cobroTratamientos,
    });
    handleCloseDetallePaciente();
    navigate(0);
  };

  const handleGuardar = async () => {
    const p = "" + paciente;
    const tc = "" + tipoConsulta;
    const ec = "" + estadoCita;
    const pi = "" + profesionalId;
    await axios.post(`${endpoint}/consulta`, {
      title: detalleTratamiento,
      start: "" + new Date(detalleEvento.start).toISOString(),
      end: "" + new Date(detalleEvento.end).toISOString(),
      estado: estadoCita,
      id: detalleEvento.resourceId,
      paciente_id: p.split(" ")[0],
      tipoConsulta_id: tc.split(" ")[0],
      estadoConsulta_id: ec.split(" ")[0],
      profesional_id: pi.split(" ")[0],
    });
    handleClose();
    navigate(0);
  };

  const resizeEvent = useCallback(({ event, start, end }) => {
    console.log("asdasd");
  }, []);
  const modificarEvento = async ({ event, start, end, resourceId }) => {
    await axios.put(`${endpoint}/consulta/${event.evId}`, {
      start: "" + new Date(start).toISOString(),
      end: "" + new Date(end).toISOString(),
      resourceId: resourceId,
    });
    navigate(0);
  };
  const moveEvent = useCallback(({ event, start, end, resourceId }) => {
    modificarEvento({ event, start, end, resourceId });
  }, []);

  return (
    <NavBar>
      <h1>Agenda</h1>
      <hr />
      <Fragment>
        <DragAndDropCalendar
          dayLayoutAlgorithm={"no-overlap"}
          views={["day", "month", "agenda"]}
          min={new Date(1972, 0, 1, 6, 0, 0, 0)}
          max={new Date(0, 0, 1, 20, 30, 0, 0)}
          step={60}
          messages={messages}
          culture={culture}
          resourceTitleAccessor={"nombre"}
          resources={gabinetes}
          onEventResize={resizeEvent}
          events={myEvents}
          defaultDate={defaultDate}
          defaultView={Views.DAY}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={handleSelectSlot}
          onSelectEvent={onSelectEvent}
          style={{ height: 1000 }}
          eventPropGetter={eventPropGetter}
          onEventDrop={moveEvent}
          selectable
          popup
          resourceIdAccessor="id"
          timeslots={1}
        />
        <Dialog
          fullScreen={fullScreen}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle style={{backgroundColor:"#155E30", color:"white"}}>{"Agendar cita"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              En esta ventana de dialogo podr&aacute;s agendar una cita
            </DialogContentText>
            <br />
            <Autocomplete
              required
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
              required
              onChange={(e) => setDetalleTratamiento(e.target.value)}
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
              required
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
              required
              freeSolo
              id="estadoCita"
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
            <br />
            <Autocomplete
              required
              freeSolo
              id="agendadoPor"
              value={profesionalId}
              onChange={(e, value) => setProfesionalId(value)}
              disableClearable
              options={profesionales.map(
                (option) => option.id + " -  " + option.nombre
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Agendado por:"
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
        <div>
          <Dialog
            fullScreen={fullScreen}
            open={openDetallePaciente}
            onClose={handleCloseDetallePaciente}
          >
            <DialogTitle>
              <Container>
                <Row>
                  <Col xs={9}>
                    {auxPaciente.nombres} {auxPaciente.apellidos}
                  </Col>
                  <Col xs={3}>
                    <ButtonB
                      variant="danger"
                      style={{ width: "100px", fontSize: 12 }}
                      onClick={() => borrarCita()}
                    >
                      Eliminar Cita
                    </ButtonB>
                  </Col>
                </Row>
              </Container>

              <hr />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Estado cita:
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="estado"
                  value={auxEstado.id}
                  onChange={(e) => cambiarEstadoCita(e.target.value)}
                >
                  {estadoCitas.map((option) => (
                    <MenuItem value={option.id}>{option.estado}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogTitle>
            <DialogContent>
              <Accordion style={{ width: "500px" }}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Cobros</Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Factura No</th>
                          <th>Total</th>
                          <th>Estado pago</th>
                          <th>Detalles</th>
                        </tr>
                      </thead>
                      <tbody>
                        {auxFacturas.map((factura) => (
                          <tr>
                            <td>{factura.numero}</td>
                            <td>{factura.total} Bs</td>
                            <td>{factura.estado_pago}</td>
                            <td>{factura.detalles_pago}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Cobrar Paciente</Accordion.Header>
                  <Accordion.Body>
                    <br />
                    <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 400 }}>
                      <InputLabel shrink htmlFor="select-multiple-native">
                        Servicios
                      </InputLabel>
                      <Select
                        multiple
                        native
                        value={cobroTratamientos}
                        // @ts-ignore Typings are not considering `native`
                        onChange={handleChangeMultiple}
                        label="Servicios"
                        inputProps={{
                          id: "select-multiple-native",
                        }}
                      >
                        {servicios.map((servicio) => (
                          <option key={servicio.id} value={servicio.id}>
                            {servicio.servicio}
                          </option>
                        ))}
                      </Select>
                      <br />
                      <div>
                        <TextField
                          disabled
                          id="outlined-basic"
                          label="Costo de la Sesion"
                          variant="outlined"
                          style={{ width: 100 }}
                          value={cobro}
                        />
                        <FormControl style={{ width: 200 }}>
                          <InputLabel id="estado-pago">Estado Pago</InputLabel>
                          <Select
                            labelId="estado-pago"
                            id="estado-pago"
                            label="Age"
                            value={estadoPago}
                            onChange={(e) => setEstadoPago(e.target.value)}
                          >
                            <MenuItem value={"pagado"}>Pagado</MenuItem>
                            <MenuItem value={"no pagado"}>No pagado</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField
                          value={detallesPago}
                          id="outlined-multiline-static"
                          label="Detalles del pago"
                          multiline
                          rows={3}
                          onChange={(e) => setDetallesPago(e.target.value)}
                          fullWidth
                        />
                        <FormControl fullWidth>
                          <InputLabel id="forma-pago">Tipo de Pago</InputLabel>
                          <Select
                            labelId="forma-pago"
                            id="forma-pago"
                            label="Tipo Pago"
                            value={tipoDePago}
                            onChange={(e) => setTipoDePago(e.target.value)}
                          >
                            <MenuItem value={"Efectivo"}>Efectivo</MenuItem>
                            <MenuItem value={"Transferencia"}>
                              Transferencia
                            </MenuItem>
                            <MenuItem value={"Tarjeta de Debito"}>
                              Tarjeta de Debito
                            </MenuItem>
                            <MenuItem value={"Bono"}>Bono</MenuItem>
                          </Select>
                        </FormControl>
                        <IconButton
                          aria-label="add to favorites"
                          onClick={realizarCobro}
                        >
                          <PriceCheckIcon />
                          Realizar cobro
                        </IconButton>
                      </div>
                    </FormControl>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Crear Bono</Accordion.Header>
                  <Accordion.Body>
                    <br />
                    <div>
                      {auxPaciente.bonos == undefined ? (
                        "nada"
                      ) : (
                        <Container>
                          Sesiones paciente:
                          {auxPaciente.bonos.map((bono) => (
                            <Row>
                              <Col>
                                {bono.nombre} x{bono.sesiones}
                              </Col>
                              <Col>Restantes: {bono.restantes}</Col>
                              {bono.restantes > 0 ? (
                                <Col>
                                  <ButtonB
                                    style={{ width: "70%" }}
                                    size="sm"
                                    variant="link"
                                    onClick={() => consumirBono(bono.id)}
                                  >
                                    Consumir
                                  </ButtonB>
                                </Col>
                              ) : (
                                <Col>
                                  <ButtonB
                                    style={{ width: "100%" }}
                                    size="sm"
                                    variant="outline-secondary"
                                    disabled
                                  >
                                    Bono consumido
                                  </ButtonB>
                                </Col>
                              )}
                              <hr />
                            </Row>
                          ))}
                        </Container>
                      )}
                      <br />
                    </div>
                    <div>
                      <TextField
                        id="outlined-basic"
                        label="Nombre"
                        variant="outlined"
                        style={{ width: 200 }}
                        value={nombreBono}
                        onChange={(e) =>
                          setValoresBono(e.target.value, "nombreBono")
                        }
                      />
                      <TextField
                        id="outlined-basic"
                        label="Sesiones"
                        type={"number"}
                        variant="outlined"
                        style={{ width: 110 }}
                        value={sesionesBono}
                        onChange={(e) =>
                          setValoresBono(e.target.value, "sesionesBono")
                        }
                      />
                      <TextField
                        id="outlined-basic"
                        label="Monto"
                        variant="outlined"
                        style={{ width: 100 }}
                        value={costoBono}
                        onChange={(e) =>
                          setValoresBono(e.target.value, "costoBono")
                        }
                      />
                      <IconButton aria-label="add to favorites">
                        <PriceCheckIcon onClick={crearBono} />
                      </IconButton>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetallePaciente}>Cancelar</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Fragment>
    </NavBar>
  );
};

export default Agenda;
