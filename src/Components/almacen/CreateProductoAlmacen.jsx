import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const referenciaAPI = "http://localhost:8000/api/inventario";

const CreateProductoAlmacen = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioCompra, setPrecioCompra] = useState(0);
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [existencias, setExistencias] = useState(0);
  const navigate = useNavigate();

  const guardar = async (e) => {
    e.preventDefault();
    await axios.post(referenciaAPI, {
      nombre: nombre,
      descripcion: descripcion,
      precioCompra: precioCompra,
      fechaIngreso: fechaIngreso,
      existencias: existencias,
    });
    navigate("/");
  };
  return (
    <div>
      <h3>Crear producto</h3>
      <form onSubmit={guardar}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripcion</label>
          <input
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Precio compra</label>
          <input
            value={precioCompra}
            onChange={(e) => setPrecioCompra(e.target.value)}
            type="number"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha Ingreso</label>
          <input
            value={fechaIngreso}
            onChange={(e) => setFechaIngreso(e.target.value)}
            type="date"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Existencias</label>
          <input
            value={existencias}
            onChange={(e) => setExistencias(e.target.value)}
            type="number"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default CreateProductoAlmacen;
