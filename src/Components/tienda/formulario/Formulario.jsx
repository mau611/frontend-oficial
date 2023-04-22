import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablaProductos from "./TablaProductos";
const endpoint = "www.shantispawellnesslife.com/api";

const Formulario = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState("");
  const [licenciados, setLicenciados] = useState([]);
  const [licenciado, setLicenciado] = useState("");
  const [ingresoProductos, setIngresoProductos] = useState([]);
  const [ingresoP, setIngresoP] = useState("");
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [observaciones, setObservaciones] = useState("");
  const [detallesPago, setDetallesPago] = useState("");
  const [estadoPago, setEstadoPago] = useState("");
  const [formaPago, setFormaPago] = useState("");
  const [repeticiones, setRepeticiones] = useState([]);

  const getLicenciados = async () => {
    const response = await axios.get(`${endpoint}/profesionales`);
    setLicenciados(response.data);
  };

  const getPacientes = async () => {
    const response = await axios.get(`${endpoint}/pacientes`);
    setPacientes(response.data);
  };

  const getIngresoProductos = async () => {
    const response = await axios.get(`${endpoint}/ingreso_productos`);
    setIngresoProductos(response.data);
    console.log(response.data.find((element) => element.id == 1));
  };

  const guardarProducto = () => {
    if (ingresoP.length > 1) {
      let valor = ingresoP.split(" ")[0];
      productos.push(ingresoProductos.find((element) => element.id == valor));
      repeticiones.push(parseInt(valor))
      setIngresoP("");
      var aux = 0;
      productos.map((producto) => (aux = aux + producto.PrecioVenta));
      setTotal(aux);
    }
  };

  const eliminar = () => {
    setProductos([]);
    setTotal(0);
    setObservaciones("");
    setDetallesPago("")
    setEstadoPago("");
    setFormaPago("");
    setPaciente("");
    setLicenciado("");
    setIngresoP([]);
    setRepeticiones([])
  };

  const realizarVenta = async () => {
    console.log(
      paciente,
      licenciado,
      productos,
      total,
      formaPago,
      estadoPago,
      observaciones,
      repeticiones
    );
    await axios.post(`${endpoint}/venta`, {
      total: total,
      estado: estadoPago,
      tipo_pago:formaPago,
      detalles_pago:detallesPago,
      observaciones: observaciones,
      paciente_id:paciente,
      profesional_id:licenciado,
      productos: repeticiones,
    });
    navigate(0);
  };

  useEffect(() => {
    getPacientes();
    getLicenciados();
    getIngresoProductos();
  }, []);

  return (
    <div>
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
            label="Seleccione un paciente:"
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
        id="licenciados"
        value={licenciado}
        onChange={(e, value) => setLicenciado(value)}
        disableClearable
        options={licenciados.map(
          (option) => option.id + " -  " + option.nombre
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Vendido por:"
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
        id="ingresoProductos"
        value={ingresoP}
        onChange={(e, value) => setIngresoP(value)}
        disableClearable
        options={ingresoProductos.map(
          (option) =>
            option.id +
            " -  " +
            option.producto.Nombre +
            " " +
            option.PrecioVenta
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Seleccione un producto:"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
      <br />
      <Button variant="outlined" onClick={guardarProducto}>
        Agregar Producto
      </Button>
      <Button variant="outlined" onClick={() => setIngresoP("")}>
        Cancelar
      </Button>
      <TablaProductos productos={productos} total={total} />
      <br />
      <div>
        <FormControl sx={{ m: 4, minWidth: 200 }}>
          <InputLabel id="estadoPago-label">Estado de Pago</InputLabel>
          <Select
            labelId="estadoPago-label"
            id="estadoPago"
            label="Estado de Pago"
            onChange={(e) => setEstadoPago(e.target.value)}
            value={estadoPago}
          >
            <MenuItem value="">
              <em>Seleccione</em>
            </MenuItem>
            <MenuItem value="Pagado">Pagado</MenuItem>
            <MenuItem value="No Pagado">No Pagado</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 4, minWidth: 200 }}>
          <InputLabel
            id="formaPago-label"
            hidden={estadoPago == "Pagado" ? false : true}
          >
            Forma de pago
          </InputLabel>
          <Select
            labelId="formaPago-label"
            id="formaPago"
            label="Forma de Pago"
            value={formaPago}
            onChange={(e) => setFormaPago(e.target.value)}
            hidden={estadoPago == "Pagado" ? false : true}
          >
            <MenuItem value="">
              <em>Seleccione</em>
            </MenuItem>
            <MenuItem value="Efectivo">Efectivo</MenuItem>
            <MenuItem value="Transferencia">Transferencia</MenuItem>
            <MenuItem value="Tarjeta">Tarjeta</MenuItem>
          </Select>
        </FormControl>
      </div>
      <TextField
        id="observaciones"
        label="Observaciones"
        multiline
        rows={3}
        style={{ width: "50%" }}
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value)}
      />
      <TextField
        id="detallesPago"
        label="Detalles del pago"
        multiline
        rows={3}
        style={{ width: "50%" }}
        value={detallesPago}
        onChange={(e) => setDetallesPago(e.target.value)}
      />
      <br />
      <br />
      <Button onClick={eliminar} variant="outlined" color={"error"}>
        Borrar Seleccion
      </Button>
      <Button onClick={realizarVenta} variant="contained" color={"success"}>
        Realizar Venta
      </Button>
    </div>
  );
};

export default Formulario;
