import './App.css';
import ShowProductoAlmacen from './Components/almacen/ShowProductoAlmacen';
import CreateProductoAlmacen from './Components/almacen/CreateProductoAlmacen';
import EditProductoAlmacen from './Components/almacen/EditProductoAlmacen';
import Inicio from './Components/estructura/inicio';
import Agenda from './Components/agenda/Agenda';
import Pacientes from "./Components/pacientes/Pacientes"
import Clinica from "./Components/clinica/Clinica"
import ConfigIndex from './Components/configuracion/Index';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inventario from './Components/stock/Inventario';
import Tienda from './Components/tienda/Tienda';
import Cuentas from './Components/cuentas/Cuentas';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Inicio/>} />
          <Route path='/almacen' element={<ShowProductoAlmacen/>} />
          <Route path='/crear' element={<CreateProductoAlmacen/>} />
          <Route path='/edit/:id' element={<EditProductoAlmacen/>} />
          <Route path='/agenda' element={<Agenda/>} />
          <Route path='/pacientes' element={<Pacientes/>} />
          <Route path='/clinica' element={<Clinica/>} />
          <Route path='/configuracion' element={<ConfigIndex/>} />
          <Route path='/stock' element={<Inventario/>} />
          <Route path='/tienda' element={<Tienda/>}/>
          <Route path='/cuentas' element={<Cuentas/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
