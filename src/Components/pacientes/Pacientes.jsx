import React from "react";
import { useDemoData } from "@mui/x-data-grid-generator";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridToolbar,
  esES 
} from "@mui/x-data-grid";
import NavBar from "../estructura/NavBar";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/material";

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

export const Pacientes = () => {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });

  return (
    <NavBar>
        <h1>Lista de Pacientes</h1>
        <br />
      <Box sx={{ height: 700, width: "100%" }}>
        <DataGrid
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          pagination
          pageSize={10}
          rowsPerPageOptions={[10]}
          components={{
            Pagination: CustomPagination,
            Toolbar: GridToolbar,
          }}
          {...data}
        />
      </Box>
    </NavBar>
  );
};

export default Pacientes;
