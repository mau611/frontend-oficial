import React from "react";
import "./css/inicio.css";
import { Link } from "react-router-dom";
import logo from "./../../shanti_transparencia.png";

const inicio = () => {
  return (
    <div className="jumbotron text-center">
      <div className="container">
        <div className="flex flex-col items-center justify-center" >
          <img src={logo} className="rounded" width={300} alt="logo" />
        </div>
        <br />
        <div className="row">
          <div className="col-lg-3">
            <Link to="/agenda" className="btn btn-outline-light btn-lg">
              Agenda
            </Link>
          </div>
          <div className="col-lg-3">
            <Link to="/pacientes" className="btn btn-outline-light btn-lg">
              Pacientes
            </Link>
          </div>
          <div className="col-lg-3">
            <Link to="/clinica" className="btn btn-outline-light btn-lg">
              Historias
            </Link>
          </div>
          <div className="col-lg-3">
            <Link to="/stock" className="btn btn-outline-light btn-lg">
              Stock
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <Link to="/cuentas" className="btn btn-outline-light btn-lg">
              Cuentas
            </Link>
          </div>
          <div className="col-lg-3">
            <Link to="/estadisticas" className="btn btn-outline-light btn-lg">
              Estadisticas
            </Link>
          </div>
          <div className="col-lg-3">
            <Link to="/sistemas" className="btn btn-outline-light btn-lg">
              Sistemas
            </Link>
          </div>
          <div className="col-lg-3">
            <Link to="/configuracion" className="btn btn-outline-light btn-lg">
              Configuracion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default inicio;
