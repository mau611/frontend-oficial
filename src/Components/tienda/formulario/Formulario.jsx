import { Autocomplete, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TablaProductos from "./TablaProductos";
const endpoint = "http://localhost:8000/api";

const Formulario = () => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState("");
  const [licenciados, setLicenciados] = useState([]);
  const [licenciado, setLicenciado] = useState("");
  const [ingresoProductos, setIngresoProductos] = useState([]);
  const [ingresoP, setIngresoP] = useState("");
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

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
    console.log(response.data.find(element => element.id ==1));
  };

  const guardarProducto = () => {
    if(ingresoP.length >1){
        let valor = ingresoP.split(" ")[0]
        productos.push(ingresoProductos.find(element => element.id == valor))
        setIngresoP("");
        var aux = 0;
        productos.map((producto)=>(
            aux = aux + producto.PrecioVenta
        ))
        setTotal(aux);
    }
  };

  const eliminar = () => {
    setProductos([])
  }

  useEffect(() => {
    getPacientes();
    getLicenciados();
    getIngresoProductos();
  }, []);

  const handleSubmit = () => {
    return 0;
  };
  return (
    <div>
      <form onSubmit={handleSubmit}></form>
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
      <Button variant="outlined" onClick={guardarProducto}>
        Agregar Producto
      </Button>
      <Button variant="outlined" onClick={()=>setIngresoP("")}>
        Cancelar
      </Button>
      <TablaProductos productos={productos} total={total}/>
      <Button onClick={eliminar} onDele variant="outlined" color={"error"}>Borrar Seleccion</Button>
      <Button onClick={eliminar} variant="contained" color={"success"}>Realizar Venta</Button>
    </div>
  );
};

export default Formulario;
