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
import NavBar from "../estructura/NavBar";
require('globalize/lib/cultures/globalize.culture.es')

const endpoint = "http://localhost:8000/api";
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const cultures = ['en', 'en-GB', 'es', 'fr', 'ar-AE']
const lang = {
  en: null,
  'en-GB': null,
  es: {
    week: 'Semana',
    work_week: 'Semana de trabajo',
    day: 'Día',
    month: 'Mes',
    previous: 'Atrás',
    next: 'Después',
    today: 'Hoy',
    agenda: 'Lista de citas',
    noEventsInRange: 'No existen citas en este intervalo.',

    showMore: (total) => `+${total} más`,
  },
  fr: {
    week: 'La semaine',
    work_week: 'Semaine de travail',
    day: 'Jour',
    month: 'Mois',
    previous: 'Antérieur',
    next: 'Prochain',
    today: `Aujourd'hui`,
    agenda: 'Ordre du jour',

    showMore: (total) => `+${total} plus`,
  },
  'ar-AE': {
    week: 'أسبوع',
    work_week: 'أسبوع العمل',
    day: 'يوم',
    month: 'شهر',
    previous: 'سابق',
    next: 'التالي',
    today: 'اليوم',
    agenda: 'جدول أعمال',

    showMore: (total) => `+${total} إضافي`,
  },
}

const Agenda = () => {
  const [culture, setCulture] = useState('es')
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

	const { defaultDate, scrollToTime, messages } = useMemo(
		() => ({
			defaultDate: new Date(),
			scrollToTime: new Date(1970, 1, 1, 6),
      messages: lang[culture],
		}),
		[]
	);
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
			paciente_id: p.split[0],
			tipoConsulta_id: tc.split[0],
			estadoConsulta_id: ec.split[0],
		});
		handleClose();
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
					style={{ height: 700 }}
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
		</NavBar>
	);
};

export default Agenda;




//marta carrillo stiletto 17:00 facial