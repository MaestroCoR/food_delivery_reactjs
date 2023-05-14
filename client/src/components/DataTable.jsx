import React from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";

const DataTable = ({ columns, data, title, actions }) => {
  const defaultMaterilTheme = createTheme();
  return (
    <ThemeProvider theme={defaultMaterilTheme}>
      <MaterialTable>
        columns = {columns}
        data = {data}
        title = {title}
        actions = {actions}
      </MaterialTable>
    </ThemeProvider>
  );
};

export default DataTable;
