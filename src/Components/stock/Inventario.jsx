import React from "react";
import PropTypes from "prop-types";
import NavBar from "../estructura/NavBar";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProductosVenta from "./ProductosVenta";
import ProductosUso from "./ProductosUso";
import Proveedores from "./Proveedores";

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
const Inventario = () => {
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
        <h1>Control de Inventario</h1>
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
            <Tab label="Productos a la venta" {...a11yProps(0)} />
            <Tab label="Uso Gabinete" {...a11yProps(1)} />
            <Tab label="Proveedores" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <div>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ProductosVenta/>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <ProductosUso/>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Proveedores/>
          </TabPanel>
        </div>
      </Box>
    </NavBar>
  );
};

export default Inventario;