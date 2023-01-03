import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

const referenciaAPI = "http://localhost:8000/api"

const ShowProductoAlmacen = () => {

  const [productos, setproductos] = useState([]);

  useEffect(() => {
    getProductosAlmacen()
  },[])
  
  const getProductosAlmacen = async () => {
    const response = await axios.get(`${referenciaAPI}/inventario`)
    setproductos(response.data)
  };

  const deleteProductosAlmacen = async (id) => {
    const response = await axios.delete(`${referenciaAPI}/inventario/${id}`)
    getProductosAlmacen()
  };

  const consumirProductosAlmacen = async (id) => {
    const response = await axios.put(`${referenciaAPI}/inventarioDescontar/${id}`)
    getProductosAlmacen()
  };

  return (
    <div>
        <div className="d-grid gap-2">
            <Link to="/crear" className="btn btn-success btn-lg mt-2 mb-2 text-white">Crear</Link>
        </div>
        <table className="table table-striped">
            <thead className="bg-primary text-white">
                <tr>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Precio</th>
                    <th>fechaIngreso</th>
                    <th>Existencias</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                { productos.map((producto)=>(
                    <tr key={producto.id}>
                        <td>{producto.nombre}</td>
                        <td>{producto.descripcion}</td>
                        <td>{producto.precioCompra}</td>
                        <td>{producto.fechaIngreso}</td>
                        <td>{producto.existencias}</td>
                        <td>
                            <Link to={`/edit/${producto.id}`} className="btn btn-warning"> Editar</Link>
                            <button onClick={()=>deleteProductosAlmacen(producto.id)} className="btn btn-danger">Eliminar</button>
                            <button onClick={()=>consumirProductosAlmacen(producto.id)} className="btn btn-info">Descontar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );

};

export default ShowProductoAlmacen;
