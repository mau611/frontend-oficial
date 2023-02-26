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
import FormularioHistoria from "./historias/FormularioHistoria";

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

export const Clinica = () => {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });

  return (
    <NavBar>
        <h1>Historias Clinicas</h1>
        <br />
        <FormularioHistoria/>
    </NavBar>
  );
};

export default Clinica;
