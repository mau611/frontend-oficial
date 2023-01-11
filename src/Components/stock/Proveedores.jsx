import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const Columnas = [
	{ field: "id", headerName: "ID" },
	{ field: "nombre", headerName: "Proveedor", width: 200 },
	{ field: "contacto", headerName: "Contacto", width: 200 },
	{ field: "accion", headerName: "accion", width: 200 },
];

const endpoint = "http://localhost:8000/api";

const Proveedores = () => {
	const [state, setState] = useState({
		nombre: "",
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

	const [proveedores, setProveedores] = useState([]);
	useEffect(() => {
		getProveedores();
	}, []);

	const getProveedores = async () => {
		const response = await axios.get(`${endpoint}/proveedores`);
		setProveedores(response.data);
		console.log(response.data);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios.post(`${endpoint}/proveedor`, {
			nombre: state.nombre,
		});
		navigate(0);
	};

	return (
		<div style={{ height: 500, width: "100%" }}>
			<Paper sx={{ width: "100%", overflow: "hidden" }}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{Columnas.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
					</Table>
				</TableContainer>
			</Paper>
			<DataGrid
				rows={proveedores}
				columns={Columnas}
				pageSize={10}
				rowsPerPageOptions={[10]}
				checkboxSelection
			/>
			<div>
				<Button variant="outlined" onClick={handleClickOpen}>
					Agregar proveedor
				</Button>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>Agregar Proveedor</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							value={state.nombre}
							margin="dense"
							id="nombre"
							label="Nombre"
							type="text"
							fullWidth
							variant="standard"
							onChange={(e) => handleChange(e.target.value, "nombre")}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancelar</Button>
						<Button onClick={handleSubmit}>Guardar</Button>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
};

export default Proveedores;
