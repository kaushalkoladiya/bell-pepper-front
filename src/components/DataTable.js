import React from "react";
import PropTypes from "prop-types";
import RDataTable from "react-data-table-component";

const customStyles = {
  rows: {
    style: {},
  },
  headCells: {
    style: {
      fontWeight: "500",
      fontSize: "18px",
    },
  },
  cells: {
    style: {},
  },
};

const DataTable = ({ data, title, columns, ...res }) => {
  return (
    <RDataTable
      title={title}
      columns={columns}
      data={data}
      customStyles={customStyles}
      responsive
      pagination
      {...res}
    />
  );
};

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default DataTable;
