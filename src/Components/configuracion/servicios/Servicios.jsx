import {
	Autocomplete,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

const Columnas = [
	{ field: "id", headerName: "ID", width: 70 },
	{ field: "nombre", headerName: "Consultorio", width: 130 },
];

const endpoint = "www.shantispawellnesslife.com/api";

const Servicios = () => {
	const [state, setState] = useState({
		servicio: "",
		costo: 0,
	});
	const handleChange = (value, name) => {
		console.log(value);
		setState((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const navigate = useNavigate();
	const handleClose = () => {
		setState({
			nombre: "",
		});
		setOpen(false);
	};

	const [servicios, setServicios] = useState([]);
	useEffect(() => {
		getServicios();
	}, []);

	const getServicios = async () => {
		const response = await axios.get(`${endpoint}/servicios`);
		setServicios(response.data);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios.post(`${endpoint}/servicio`, {
			servicio: state.servicio,
			costo:state.costo
		});
		navigate(0);
	};

	return (
		<Fragment>
			<div>Lista de Servicios</div>
			<div style={{ height: 600, width: "100%" }}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Servicio</TableCell>
								<TableCell>Costo</TableCell>
								<TableCell>Acciones</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{servicios.map((row) => (
								<TableRow
									key={row.name}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
									<TableCell component="th" scope="row">
										{row.id}
									</TableCell>
									<TableCell align="">{row.servicio}</TableCell>
									<TableCell align="">{row.costo}</TableCell>
									<TableCell>
										<IconButton aria-label="delete">
											<EditIcon fontSize="small" color="secondary" />
										</IconButton>
										<IconButton aria-label="delete">
											<LocalAtmIcon fontSize="small" color="success" />
										</IconButton>
									</TableCell>
									
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			<div>
				<Button variant="outlined" onClick={handleClickOpen}>
					Agregar Servicio
				</Button>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>Creacion de Servicio</DialogTitle>
					<DialogContent>
						<TextField
							value={state.servicio}
							autoFocus
							margin="dense"
							id="servicio"
							label="Servicio"
							type="text"
							fullWidth
							variant="standard"
							onChange={(e) => handleChange(e.target.value, "servicio")}
						/>
						<TextField
							value={state.costo}
							autoFocus
							margin="dense"
							id="costo"
							label="Costo"
							type="text"
							fullWidth
							variant="standard"
							onChange={(e) => handleChange(e.target.value, "costo")}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancelar</Button>
						<Button onClick={handleSubmit}>Guardar</Button>
					</DialogActions>
				</Dialog>
			</div>
		</Fragment>
	);
};

export default Servicios;
