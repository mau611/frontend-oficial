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
const endpoint = "https://stilettoapi.com/api";

const Paciente = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState({});
  const [profesionales, setProfesionales] = React.useState({});
  const [key, setKey] = useState("home");

  useEffect(() => {
    getPaciente();
    getProfesionalACargo();
  }, []);

  const getProfesionalACargo = async () => {
    const response = await axios.get(
      `${endpoint}/paciente/profesionales/${paciente.id}`
    );
    setProfesionales(response.data);
  };

  const getPaciente = async () => {
    const response = await axios.get(`${endpoint}/paciente/${id}`);
    setPaciente(response.data);
  };

  return (
    <NavBar>
      <h4>
        {paciente.nombres} {paciente.apellidos}
      </h4>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="paciente" title="Detalle del paciente">
          <DetallesPaciente
            diagnosticos={paciente.diagnosticos}
            paciente_id={paciente.id}
          />
        </Tab>
        <Tab eventKey="filiacion" title="Filiacion">
          <Filiacion
            id={paciente.id}
            nombres={paciente.nombres}
            apellidos={paciente.apellidos}
            ci={paciente.ci}
            telefono={paciente.telefono}
            sexo={paciente.sexo}
            direccion={paciente.direccion}
          />
        </Tab>
        <Tab eventKey="contabilidad" title="Contabilidad">
          <Contabilidad citas={paciente.citas} />
        </Tab>
        <Tab eventKey="bonos" title="Bonos">
          <Bonos bonos={paciente.bonos} />
        </Tab>
        <Tab eventKey="documentos" title="Documentos">
          <Documentos />
        </Tab>
        <Tab eventKey="historial" title="Historial Clinico">
          <Historial
            citas={paciente.citas}
            diagnosticos={paciente.diagnosticos}
            profesionales={profesionales}
          />
        </Tab>
      </Tabs>
    </NavBar>
  );
};

export default Paciente;
