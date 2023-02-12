import React from 'react'
import NavBar from '../estructura/NavBar'
import Formulario from './formulario/Formulario'

const Tienda = () => {
  return (
    <NavBar>
      <h1>Venta de productos</h1>
      <Formulario/>
    </NavBar>
  )
}

export default Tienda