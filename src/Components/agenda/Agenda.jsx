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
	Slide,
	TextField,
} from "@mui/material";
import NavBar from "../estructura/NavBar";
import { useNavigate } from "react-router-dom";
import { buildWarning } from "@mui/x-data-grid/internals";
require("globalize/lib/cultures/globalize.culture.es");

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
	const [eventosBD, setEventosBD] = useState([]);
	const [eventosProcesados, setEventosProcesados] = useState([]);
	const [culture, setCulture] = useState("es");
	const [gabinetes, setGabinetes] = useState([]);
	const [myEvents, setEvents] = useState([]);
	const [open, setOpen] = useState(false);
	const [pacientes, setPacientes] = useState([]);
	const [tipoConsultas, setTipoConsultas] = useState([]);
	const [estadoCitas, setEstadoCitas] = useState([]);
	const [paciente, setPaciente] = useState(null);
	const [tipoConsulta, setTipoConsulta] = useState(null);
	const [estadoCita, setEstadoCita] = useState(null);
	const [detalleTratamiento, setDetalleTratamiento] = useState("");
	const [detalleEvento, setDetalleEvento] = useState("");
	const dataFetchedRef = useRef(false);

	const eventPropGetter = useCallback(
		(event, start, end, isSelected) => ({
			...(isSelected && {
				style: {
					backgroundColor: "#63A355",
				},
			}),
			...((event.resourceId === 1) && {
				style: {
					backgroundColor: "#017745",
				},
			}),
      ...((event.resourceId === 2) && {
				style: {
					backgroundColor: "#00A77B",
				},
			}),
      ...((event.resourceId === 3) && {
				style: {
					backgroundColor: "#A6D47C",
				},
			}),
      ...((event.resourceId === 4) && {
				style: {
					backgroundColor: "#AE64C7",
				},
			}),
      ...((event.resourceId === 5) && {
				style: {
					backgroundColor: "#9bd3ae",
				},
			}),
      ...((event.resourceId === 6) && {
				style: {
					backgroundColor: "#FF807A",
				},
			}),
      ...((event.resourceId === 7) && {
				style: {
					backgroundColor: "#8A2C47",
				},
			}),
		}),
		[]
	);

	const navigate = useNavigate();
	const clickRef = useRef(null);

	const handleClickOpen = (detallesEvento) => {
		setDetalleEvento(detallesEvento);
		setOpen(true);
	};

	const nombrePaciente = (pacId) => {
		console.log(pacientes);
		return pacientes.filter((paciente) => paciente.id === pacId)[0] || {};
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
		if (dataFetchedRef.current) return;
		dataFetchedRef.current = true;
		console.log("effect");
		getGabinetes();
		getPacientes();
		getTipoConsultas();
		getEstadoCitas();
		getEventosBD();
		window.clearTimeout(clickRef?.current);
	}, []);

	const getEventosBD = async () => {
		const response = await axios.get(`${endpoint}/consultas`);
		response.data.map((ev) => {
			setEvents((prev) => [
				...prev,
				{
					start: new Date(ev.start),
					end: new Date(ev.end),
					title: ev.title,
					resourceId: ev.consultorio_id,
				},
			]);
		});
	};

	const localizer = momentLocalizer(moment);
	const handleSelectSlot = useCallback(({ start, end, title, resourceId }) => {
		handleClickOpen({ start, end, resourceId });
	});

	const handleSelectEvent = useCallback(
		(event) => window.alert(event.title),
		[]
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
		/**
		 * Here we are waiting 250 milliseconds (use what you want) prior to firing
		 * our method. Why? Because both 'click' and 'doubleClick'
		 * would fire, in the event of a 'doubleClick'. By doing
		 * this, the 'click' handler is overridden by the 'doubleClick'
		 * action.
		 */
		window.clearTimeout(clickRef?.current);
		clickRef.current = window.setTimeout(() => {
			window.alert(buildWarning(calEvent, "onSelectEvent"));
		}, 250);
	}, []);

	const handleGuardar = async () => {
		const p = "" + paciente;
		const tc = "" + tipoConsulta;
		const ec = "" + estadoCita;
		await axios.post(`${endpoint}/consulta`, {
			title: detalleTratamiento,
			start: "" + new Date(detalleEvento.start).toISOString(),
			end: "" + new Date(detalleEvento.end).toISOString(),
			estado: estadoCita,
			id: detalleEvento.resourceId,
			paciente_id: p.split(" ")[0],
			tipoConsulta_id: tc.split(" ")[0],
			estadoConsulta_id: ec.split(" ")[0],
		});
		handleClose();
    navigate(0);
	};
	return (
		<NavBar>
			<h1>Agenda</h1>
			<hr />
			<Fragment>
				<Calendar
					min={new Date(1972, 0, 1, 6, 0, 0, 0)}
					max={new Date(0, 0, 1, 20, 30, 0, 0)}
					step={30}
					messages={messages}
					culture={culture}
					resourceTitleAccessor={"nombre"}
					resources={gabinetes}
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
					selectable
				/>
				<Dialog
					open={open}
					TransitionComponent={Transition}
					keepMounted
					onClose={handleClose}
					aria-describedby="alert-dialog-slide-description">
					<DialogTitle>{"Agendar cita a Paciente"}</DialogTitle>
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
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancelar</Button>
						<Button onClick={handleGuardar}>Guardar Cita</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		</NavBar>
	);
};

export default Agenda;