import React from "react";
import TableComponent from "../../shared-components/Table";

export const ProductList = (props) => {
  const { columns, dataTable, handleSelectRow } = props;

  return (
    <div>
      <TableComponent
        columns={columns}
        data={dataTable}
        onRow={handleSelectRow}
      />
    </div>
  );
};
