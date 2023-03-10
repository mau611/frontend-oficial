import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NavBar from "../estructura/NavBar";
import CrearGabinetes from "../configuracion/gabinetes/CrearGabinetes";
import CrearTipoConsulta from "./tipoConsultas/CrearTipoConsultas";
import CrearEstadoCita from "./estadoCitas/CrearEstadoCita";
import Licenciados from "./licenciados/Licenciados";
import Servicios from "./servicios/Servicios";
import ImportarDatos from "./importarDatos/ImportarDatos";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Index = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <NavBar>
        <h1>Configuracion</h1>
        <hr />
      <Box sx={{ flexGrow: 1, bgcolor: "background.paper"}}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="inherit"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            style={{backgroundColor:"#155E30"}}
          >
            <Tab label="Gabinetes" id="gabinetes" {...a11yProps(0)} href="#gabinetes"/>
            <Tab label="Tipos de Consulta" id="tipos_de_consulta" {...a11yProps(1)} href="#tipos_de_consulta"/>
            <Tab label="Estado Citas" id="estados_citas" {...a11yProps(2)} href="#estados_citas"/>
            <Tab label="Licenciados de turno" id="lic_de_turno" {...a11yProps(3)} href="#lic_de_turno"/>
            <Tab label="Servicios" {...a11yProps(4)} id="servicios" href="#servicios"/>
            <Tab label="Importacion de datos" {...a11yProps(4)} id="importar" href="#importar"/>
          </Tabs>
        </AppBar>
        <div>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <CrearGabinetes/>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <CrearTipoConsulta/>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <CrearEstadoCita/>
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <Licenciados/>
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            <Servicios/>
          </TabPanel>
          <TabPanel value={value} index={5} dir={theme.direction}>
            <ImportarDatos/>
          </TabPanel>
        </div>
      </Box>
    </NavBar>
  );
};

export default Index;
