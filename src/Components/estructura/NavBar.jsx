import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import axios from "axios";
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { Link, useNavigate } from "react-router-dom";
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
import Alerta from "./Alerta";

const drawerWidth = 240;
const endpoint = "https://stilettoapi.com/api/paciente";

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
  const [alerta, setAlerta] = React.useState(false);

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
  const handleCloseModal = () => setOpenModal(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlerta(true);
    await axios.post(endpoint, {
      nombres: state.nombres,
      apellidos: state.apellidos,
      telefono: state.telefono,
      fecha_nacimiento: state.fecha_nacimiento,
      ci: state.ci,
      sexo: state.sexo,
      direccion: state.direccion,
      fecha_registro: "1996/05/4"
    });
    navigate(0);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOnClick = (e, text) => {
    if (text === "Agregar Paciente") {
      handleOpenModal();
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
          {["Agenda", "Agregar Paciente", "Pacientes", "Clinica", "Tienda", "Stock"].map(
            (text, index) => (
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
                      <Link to="/agenda">
                        <TodayIcon />
                      </Link>
                    ) : index === 1 ? (
                      <PersonAddIcon />
                    ) : index === 2 ? (
                      <Link to="/pacientes"><PersonSearchIcon /></Link>
                    ) : index === 3 ? (
                      <Link to="/"><LocalHospitalIcon /></Link>
                    ): index === 4 ? (
                      <Link to="/tienda"><LocalGroceryStoreIcon /></Link>
                    ) : (
                      <Link to="/stock"><InventoryIcon /></Link>
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {["Cuentas", "Estadisticas", "Sistemas", "Configuracion"].map(
            (text, index) => (
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
                      <Link to="/cuentas"><AccountBalanceWalletIcon/></Link>
                    ) : index === 1 ? (
                      <Link to="/"><AnalyticsIcon /></Link>
                    ) : index === 2 ? (
                      <Link to="/"><ComputerIcon /></Link>
                    ) : index === 3 ? (
                      <Link to="/configuracion"><SettingsIcon /></Link>
                    ) : (
                      <Link to="/"><InventoryIcon /></Link>
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Dialog open={openModal} onClose={handleCloseModal}>
          <form onSubmit={handleSubmit} method="post">
            <DialogTitle>Registro de paciente</DialogTitle>
            <Alerta mostrar={alerta} titulo={"Error en los datos"} contenido={"revise "}/>
            <DialogContent>
              <TextField
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
                autoFocus
                margin="dense"
                id="fecha_nacimiento"
                name="fecha_nacimiento"
                type="date"
                className="date"
                fullWidth
                required
                variant="standard"
                onChange={(e) =>
                  handleChange(e.target.value, "fecha_nacimiento")
                }
              />
              <TextField
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
              <TextField
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
