import * as React from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import axioss from "axios";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TodayIcon from "@mui/icons-material/TodayOutlined";
import PersonSearchIcon from "@mui/icons-material/PersonSearchOutlined";
import LocalHospitalIcon from "@mui/icons-material/LocalHospitalOutlined";
import InventoryIcon from "@mui/icons-material/InventoryOutlined";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AnalyticsIcon from "@mui/icons-material/AnalyticsOutlined";
import ComputerIcon from "@mui/icons-material/ComputerOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import logoNav from "./../../navbar.png";
import axios from "../../axios";
import { useAuth } from "../../AuthContext";

const drawerWidth = 240;
const endpoint = "http://localhost:8000/api/paciente";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function NavBar({ children, titulo }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [nombresError, setNombresError] = React.useState(null);
  const [apellidosError, setApellidosError] = React.useState(null);
  const [telefonoError, setTelefonoError] = React.useState(null);
  const [nacimientoError, setNacimientoError] = React.useState(null);
  const [ciError, setCiError] = React.useState(null);
  const [sexoError, setSexoError] = React.useState(null);
  const [direccionError, setDireccionError] = React.useState(null);
  const [areas, setAreas] = React.useState([]);
  const getAreas = async () => {
    const response = await axios.get(`${endpoint}/areas`);
    setAreas(response.data);
  };
  useEffect(() => {
    getAreas();
  }, []);
  const valorFecha = new Date();
  const fecha =
    valorFecha.getFullYear() +
    "-" +
    (parseInt(valorFecha.getMonth()) + 1) +
    "-" +
    valorFecha.getDate();

  const [state, setState] = React.useState({
    nombres: "",
    apellidos: "",
    telefono: "",
    fecha_nacimiento: "",
    ci: "",
    sexo: "",
    direccion: "",
  });
  const navigate = useNavigate();

  const handleChange = (value, name) => {
    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setNombresError("");
    setApellidosError("");
    setTelefonoError("");
    setNacimientoError("");
    setCiError("");
    setSexoError("");
    setDireccionError("");
    setOpenModal(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axioss.post(endpoint, {
        nombres: state.nombres,
        apellidos: state.apellidos,
        telefono: state.telefono,
        fecha_nacimiento: state.fecha_nacimiento,
        ci: state.ci,
        sexo: state.sexo,
        direccion: state.direccion,
        fecha_registro: "1996/05/4",
      });
      navigate(0);
    } catch (error) {
      if (error.response.status === 422) {
        console.log(error.response.data.errors);
        if (error.response.data.errors.nombres) {
          setNombresError(error.response.data.errors.nombres[0]);
        } else {
          setNombresError("");
        }
        if (error.response.data.errors.apellidos) {
          setApellidosError(error.response.data.errors.apellidos[0]);
        } else {
          setApellidosError("");
        }
        if (error.response.data.errors.telefono) {
          setTelefonoError(error.response.data.errors.telefono[0]);
        } else {
          setTelefonoError("");
        }
        if (error.response.data.errors.fecha_nacimiento) {
          setNacimientoError(error.response.data.errors.fecha_nacimiento[0]);
        } else {
          setNacimientoError("");
        }
        if (error.response.data.errors.ci) {
          setCiError(error.response.data.errors.ci[0]);
        } else {
          setCiError("");
        }
        if (error.response.data.errors.sexo) {
          setSexoError(error.response.data.errors.sexo[0]);
        } else {
          setSexoError("");
        }
        if (error.response.data.errors.direccion) {
          setDireccionError(error.response.data.errors.direccion[0]);
        } else {
          setDireccionError("");
        }
      }
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOnClick = (e, text) => {
    if (text === "Agregar Paciente") {
      handleOpenModal();
    } else if (text === "Cerrar sesion") {
      handleLogout();
    }
  };

  const { user, setUser } = useAuth();

  // check if user is logged in or not from server
  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.get("/user");
        if (resp.status === 200) {
          setUser(resp.data.data);
        }
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("user");
          window.location.href = "/";
        }
      }
    })();
  }, []);

  // if user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/" />;
  }

  // logout user
  const handleLogout = async () => {
    try {
      const resp = await axios.post("/logout");
      if (resp.status === 200) {
        localStorage.removeItem("user");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{ backgroundColor: "#155E30" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {titulo}
          </Typography>
          <Link to="/" rel="noreferrer">
            <img src={logoNav} className="rounded" width={100} alt="logo" />
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            <Link
              onClick={() =>
                (window.location = `/agenda/${
                  new Date().getFullYear() +
                  "-" +
                  (new Date().getMonth() + 1) +
                  "-" +
                  new Date().getDate()
                }/${fecha}/area/1`)
              }
            >
              Agenda
            </Link>,
            "Agregar Paciente",
            <Link to="/pacientes">Pacientes</Link>,
            <Link to="/clinica">Clinica</Link>,
            <Link to="/tienda">Tienda</Link>,
            <Link to="/stock">Stock</Link>,
            "Cerrar sesion",
          ].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={(e) => handleOnClick(e, text)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 ? (
                    <Tooltip title="Agenda" placement="right">
                      <Link
                        onClick={() =>
                          (window.location = `/agenda/${
                            new Date().getFullYear() +
                            "-" +
                            (new Date().getMonth() + 1) +
                            "-" +
                            new Date().getDate()
                          }/${fecha}/area/1`)
                        }
                      >
                        <TodayIcon />
                      </Link>
                    </Tooltip>
                  ) : index === 1 ? (
                    <Tooltip title="Crear paciente" placement="right">
                      <PersonAddIcon />
                    </Tooltip>
                  ) : index === 2 ? (
                    <Tooltip title="Lista de pacientes" placement="right">
                      <Link to="/pacientes">
                        <PersonSearchIcon />
                      </Link>
                    </Tooltip>
                  ) : index === 3 ? (
                    <Tooltip title="Historias" placement="right">
                      <Link to="/clinica">
                        <LocalHospitalIcon />
                      </Link>
                    </Tooltip>
                  ) : index === 4 ? (
                    <Tooltip title="Vender producto" placement="right">
                      <Link to="/tienda">
                        <LocalGroceryStoreIcon />
                      </Link>
                    </Tooltip>
                  ) : index === 5 ? (
                    <Tooltip title="Almacen" placement="right">
                      <Link to="/stock">
                        <InventoryIcon />
                      </Link>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Cerrar sesion" placement="right">
                      <LogoutIcon />
                    </Tooltip>
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
            <Link to="/cuentas">Cuentas</Link>,
            <Link to="/estadisticas">Estadisticas</Link>,
            <Link to="/sistemas">Sistemas</Link>,
            <Link to="/configuracion">Configuracion</Link>,
          ].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 ? (
                    <Tooltip title="Cuentas" placement="right">
                      <Link to="/cuentas">
                        <AccountBalanceWalletIcon />
                      </Link>
                    </Tooltip>
                  ) : index === 1 ? (
                    <Tooltip title="Estadisticas" placement="right">
                      <Link to="/estadisticas">
                        <AnalyticsIcon />
                      </Link>
                    </Tooltip>
                  ) : index === 2 ? (
                    <Tooltip title="Sistemas" placement="right">
                      <Link to="/sistemas">
                        <ComputerIcon />
                      </Link>
                    </Tooltip>
                  ) : index === 3 ? (
                    <Tooltip title="Configuracion" placement="right">
                      <Link to="/configuracion">
                        <SettingsIcon />
                      </Link>
                    </Tooltip>
                  ) : (
                    <Link to="/">
                      <InventoryIcon />
                    </Link>
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Dialog open={openModal} onClose={handleCloseModal}>
          <form onSubmit={handleSubmit} method="post">
            <DialogTitle style={{ backgroundColor: "#155E30", color: "white" }}>
              Registro de paciente
            </DialogTitle>
            <DialogContent>
              <TextField
                helperText={nombresError}
                error={nombresError ? true : false}
                autoFocus
                margin="dense"
                id="nombres"
                name="nombres"
                label="Nombres"
                type="text"
                fullWidth
                required
                variant="standard"
                onChange={(e) => handleChange(e.target.value, "nombres")}
              />
              <TextField
                helperText={apellidosError}
                error={apellidosError ? true : false}
                autoFocus
                margin="dense"
                id="apellidos"
                name="apellidos"
                label="Apellidos"
                type="text"
                fullWidth
                required
                variant="standard"
                onChange={(e) => handleChange(e.target.value, "apellidos")}
              />
              <TextField
                helperText={telefonoError}
                error={telefonoError ? true : false}
                autoFocus
                margin="dense"
                id="telefono"
                name="telefono"
                label="telefono"
                type="text"
                fullWidth
                required
                variant="standard"
                onChange={(e) => handleChange(e.target.value, "telefono")}
              />
              <TextField
                helperText={nacimientoError}
                error={nacimientoError ? true : false}
                label="fecha de nacimiento"
                autoFocus
                margin="dense"
                id="fecha_nacimiento"
                name="fecha_nacimiento"
                type="date"
                className="date"
                fullWidth
                required
                variant="standard"
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  handleChange(e.target.value, "fecha_nacimiento")
                }
              />
              {nacimientoError && (
                <p className="text-sm text-red-600">{nacimientoError}</p>
              )}
              <TextField
                helperText={ciError}
                error={ciError ? true : false}
                autoFocus
                margin="dense"
                id="ci"
                name="ci"
                label="Carnet de Identidad"
                type="text"
                fullWidth
                required
                variant="standard"
                onChange={(e) => handleChange(e.target.value, "ci")}
              />
              <TextField
                helperText={sexoError}
                error={sexoError ? true : false}
                id="sexo"
                type={"select"}
                fullWidth
                select
                label="Sexo"
                value={state.sexo}
                onChange={(e) => handleChange(e.target.value, "sexo")}
              >
                <MenuItem value={"masculino"}>Masculino</MenuItem>
                <MenuItem value={"femenino"}>Femenino</MenuItem>
              </TextField>
              {sexoError && <p className="text-sm text-red-600">{sexoError}</p>}
              <TextField
                helperText={direccionError}
                error={direccionError ? true : false}
                autoFocus
                margin="dense"
                id="direccion"
                name="direccion"
                label="Direccion"
                type="text"
                fullWidth
                required
                variant="standard"
                onChange={(e) => handleChange(e.target.value, "direccion")}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Cancelar</Button>
              <Button type={"submit"}>Guardar</Button>
            </DialogActions>
          </form>
        </Dialog>
        {children}
      </Box>
    </Box>
  );
}
