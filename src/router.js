import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ProtectedLayout from "./Components/ProtectedLayout";
import GuestLayout from "./Components/GuestLayout";
import Inicio from './Components/estructura/inicio';
import Agenda from './Components/agenda/Agenda';
import Pacientes from "./Components/pacientes/Pacientes"
import Clinica from "./Components/clinica/Clinica"
import ConfigIndex from './Components/configuracion/Index';
import Inventario from './Components/stock/Inventario';
import Tienda from './Components/tienda/Tienda';
import Cuentas from './Components/cuentas/Cuentas';
import Paciente from './Components/pacientes/paciente/Paciente';
import Estadisticas from './Components/estadisticas/Estadisticas';

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/inicio",
        element: <Inicio />
      },
      {
        path: "/agenda",
        element: <Agenda />
      },
      {
        path: "/pacientes",
        element: <Pacientes />
      },
      {
        path: "/clinica",
        element: <Clinica />
      },
      {
        path: "/Configuracion",
        element: <ConfigIndex />
      },
      {
        path: "/stock",
        element: <Inventario />
      },
      {
        path: "/tienda",
        element: <Tienda />
      },
      {
        path: "/cuentas",
        element: <Cuentas />
      },
      {
        path: "/paciente/:id",
        element: <Paciente />
      },
      {
        path: "/estadisticas",
        element: <Estadisticas />
      },
    ],
  },
]);

export default router;