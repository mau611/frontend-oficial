import axios from "axios";
import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom"

const referenciaAPI = "https://shantispawellnesslife.com/api/inventario/";


const EditProductoAlmacen = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioCompra, setPrecioCompra] = useState(0);
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [existencias, setExistencias] = useState(0);
  const navigate = useNavigate();
  const {id} = useParams()
    const update = async (e) => {
        e.preventDefault()
        await axios.put(`${referenciaAPI}${id}`,{
            nombre:nombre,
            descripcion:descripcion,
            precioCompra:precioCompra,
            fechaIngreso:fechaIngreso,
            existencias:existencias
        })
        navigate("/")
    }
    useEffect(()=>{
        const getProductById = async () =>{
            const response = await axios.get(`${referenciaAPI}${id}`)
            setNombre(response.data.nombre)
            setDescripcion(response.data.descripcion)
            setPrecioCompra(response.data.precioCompra)
            setFechaIngreso(response.data.fechaIngreso)
            setExistencias(response.data.existencias)
        }
        getProductById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div>
      <h3>Editar producto</h3>
      <form onSubmit={update}>
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
        <button type="submit" className="btn btn-primary">Modificar</button>
      </form>
    </div>
  )
}

export default EditProductoAlmacen