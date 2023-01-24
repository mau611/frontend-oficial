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
import axios from "axios";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

const endpoint = "http://localhost:8000/api";

const ProductosVenta = () => {
	const [state, setState] = useState({
		nombre: "",
		descripcion: "",
		proveedor: "",
		fechaIngreso: new Date().toISOString().slice(0, 10),
		precioCompra: "",
		precioVenta: "",
		cantidad: "",
		factura:"",
		vencimiento:"",
	});
	const [proveedores, setProveedores] = useState([]);
	const [datos, setDatos] = useState([]);
	const [productos, setProductos] = useState([]);
	const dataFetchedRef = useRef(false);
	useEffect(() => {
		if (dataFetchedRef.current) return;
		dataFetchedRef.current = true;
		getProductos();
		getProveedores();
	}, []);

	const getProductos = async () => {
		const response = await axios.get(`${endpoint}/productos`);
		setProductos(response.data);
		console.log(response.data);
		response.data.map((p) => {
			setDatos((dat) => [
				...dat,
				{
					id: p.id,
					Nombre: p.Nombre,
					descripcion: p.descripcion,
					proveedor: p.proveedor.nombre,
					fechaIngreso: obtenerDatos(p.ingresos)[0]
						.split("-")
						.reverse()
						.join("-"),
					precioCompra: obtenerDatos(p.ingresos)[1],
					precioVenta: obtenerDatos(p.ingresos)[2],
					cantidad: obtenerDatos(p.ingresos)[3],

				},
			]);
		});
	};

	const handleChange = (value, name) => {
		console.log(value);
		setState((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const getProveedores = async () => {
		const response = await axios.get(`${endpoint}/proveedores`);
		setProveedores(response.data);
	};

	const obtenerDatos = (ingresos, campo) => {
		let dato = [];
		ingresos.map((ingreso) => {
			console.log(ingreso);
			dato.push(ingreso.fecha);
			dato.push(ingreso.PrecioCompra);
			dato.push(ingreso.PrecioVenta);
			dato.push(ingreso.cantidad);
			dato.push(ingreso.factura);
			dato.push(ingreso.vencimiento);
			dato.push();
		});
		return dato;
	};

	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const navigate = useNavigate();
	const handleClose = () => {
		setState({
			nombre: "",
			descripcion: "",
			proveedor: "",
			fechaIngreso: new Date().toISOString().slice(0, 10),
			precioCompra: "",
			precioVenta: "",
			cantidad: "",
			factura: "",
			vencimiento: "",
		});
		setOpen(false);
	};

	const handleAgregarProducto = async (e) => {
		e.preventDefault();
		await axios.post(`${endpoint}/producto`, {
			nombre: state.nombre,
			descripcion: state.descripcion,
			proveedor: state.proveedor.split(" ")[0],
			fechaIngreso: state.fechaIngreso,
			precioCompra: state.precioCompra,
			precioVenta: state.precioVenta,
			cantidad: state.cantidad,
			factura: state.factura,
			vencimiento: state.vencimiento
		});
		navigate(0);
	};
	return (
		<Fragment>
			<div>Productos Venta</div>
			<div style={{ height: 600, width: "100%" }}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Producto</TableCell>
								<TableCell>Descripcion</TableCell>
								<TableCell>Proveedor</TableCell>
								<TableCell>Fecha ingreso</TableCell>
								<TableCell>Precio Compra</TableCell>
								<TableCell>Precio Venta</TableCell>
								<TableCell>Existencias</TableCell>
								<TableCell>Factura Nro</TableCell>
								<TableCell>Vencimiento</TableCell>
								<TableCell>Acciones</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{productos.map((row) => (
								<TableRow
									key={row.name}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
									<TableCell component="th" scope="row">
										{row.id}
									</TableCell>
									<TableCell align="">{row.Nombre}</TableCell>
									<TableCell align="">{row.descripcion}</TableCell>
									<TableCell align="">{row.proveedor.nombre}</TableCell>
									<TableCell>
										{row.ingresos.map((ingreso) => (
											<p>{ingreso.fecha}</p>
										))}
									</TableCell>
									<TableCell>
										{row.ingresos.map((ingreso) => (
											<p>{ingreso.PrecioCompra}</p>
										))}
									</TableCell>
									<TableCell>
										{row.ingresos.map((ingreso) => (
											<p>{ingreso.PrecioVenta}</p>
										))}
									</TableCell>
									<TableCell>
										{row.ingresos.map((ingreso) => (
											<p>{ingreso.cantidad}</p>
										))}
									</TableCell>
									<TableCell>
										{row.ingresos.map((ingreso) => (
											<p>{ingreso.factura}</p>
										))}
									</TableCell>
									<TableCell>
										{row.ingresos.map((ingreso) => (
											<p>{ingreso.vencimiento}</p>
										))}
									</TableCell>
									<TableCell>
										{row.ingresos.map((ingreso) => (
											<p>
												<IconButton aria-label="delete">
													<EditIcon fontSize="small" color="secondary" />
												</IconButton>
												<IconButton aria-label="delete">
													<LocalAtmIcon fontSize="small" color="success" />
												</IconButton>
											</p>
										))}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			<div>
				<Button variant="outlined" onClick={handleClickOpen}>
					Agregar Producto
				</Button>
				&nbsp;&nbsp;&nbsp;
				<Button variant="outlined" onClick={handleClickOpen}>
					Actualizar Producto
				</Button>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>Creacion de producto</DialogTitle>
					<DialogContent>
						<TextField
							value={state.nombre}
							autoFocus
							margin="dense"
							id="nombre"
							label="Nombre"
							type="text"
							fullWidth
							variant="standard"
							onChange={(e) => handleChange(e.target.value, "nombre")}
						/>
						<TextField
							value={state.descripcion}
							autoFocus
							margin="dense"
							id="desc"
							label="Descripcion"
							type="text"
							fullWidth
							variant="standard"
							onChange={(e) => handleChange(e.target.value, "descripcion")}
						/>
						<br />
						<Autocomplete
							clearOnEscape
							required
							freeSolo
							id="proveedores"
							value={state.proveedor}
							onChange={(e, value) => handleChange(value, "proveedor")}
							disableClearable
							options={proveedores.map(
								(option) => option.id + " -  " + option.nombre
							)}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Proveedor"
									InputProps={{
										...params.InputProps,
										type: "search",
									}}
									variant="standard"
								/>
							)}
						/>
						<TextField
							value={state.precioCompra}
							autoFocus
							margin="dense"
							id="compra"
							label="Precio Compra"
							type="text"
							fullWidth
							variant="standard"
							onChange={(e) => handleChange(e.target.value, "precioCompra")}
						/>
						<TextField
							value={state.precioVenta}
							autoFocus
							margin="dense"
							id="venta"
							label="Precio Venta"
							type="text"
							fullWidth
							variant="standard"
							onChange={(e) => handleChange(e.target.value, "precioVenta")}
						/>
						<TextField
							value={state.cantidad}
							autoFocus
							margin="dense"
							id="cantidad"
							label="Cantidad"
							type="number"
							fullWidth
							variant="standard"
							onChange={(e) => handleChange(e.target.value, "cantidad")}
						/>
						<TextField
							value={state.factura}
							autoFocus
							margin="dense"
							id="factura"
							label="Factura Nro:"
							type="text"
							fullWidth
							variant="standard"
							onChange={(e) => handleChange(e.target.value, "factura")}
						/>
						<TextField
							value={state.vencimiento}
							autoFocus
							margin="dense"
							id="vencimiento"
							label="Vencimiento"
							type="date"
							fullWidth
							variant="standard"
							onChange={(e) => handleChange(e.target.value, "vencimiento")}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancelar</Button>
						<Button onClick={handleAgregarProducto}>Guardar</Button>
					</DialogActions>
				</Dialog>
			</div>
		</Fragment>
	);
};

export default ProductosVenta;
