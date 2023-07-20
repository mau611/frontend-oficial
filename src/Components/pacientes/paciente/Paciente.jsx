import axios from "axios";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import NavBar from "../../estructura/NavBar";
import DetallesPaciente from "./detalles/DetallesPaciente";
import Filiacion from "./detalles/Filiacion";
import Contabilidad from "./detalles/Contabilidad";
import Bonos from "./detalles/Bonos";
import Documentos from "./detalles/Documentos";
import Historial from "./detalles/Historial";
const endpoint = "http://localhost:8000/api";

const Paciente = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState({});
  const [key, setKey] = useState('home');

  useEffect(() => {
    getPaciente();
  }, []);

  const getPaciente = async () => {
    const response = await axios.get(`${endpoint}/paciente/${id}`);
    setPaciente(response.data);
    console.log(paciente);
  };

  return (
    <NavBar>
      <h4>
        Paciente: {paciente.nombres} {paciente.apellidos}
      </h4>
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="paciente" title="Detalle del paciente">
        <DetallesPaciente/>
      </Tab>
      <Tab eventKey="filiacion" title="Filiacion">
        <Filiacion/>
      </Tab>
      <Tab eventKey="contabilidad" title="Contabilidad">
        <Contabilidad/>
      </Tab>
      <Tab eventKey="bonos" title="Bonos">
        <Bonos/>
      </Tab>
      <Tab eventKey="documentos" title="Documentos">
        <Documentos/>
      </Tab>
      <Tab eventKey="historial" title="Historial Clinico">
        <Historial citas={paciente.citas}/>
      </Tab>
    </Tabs>
    </NavBar>
  );
};

export default Paciente;
