import React from "react";
import TableComponent from "../../shared-components/Table";

export const ProductList = (props) => {
  const { columns, dataTable, setRowSelected } = props;

  return (
    <div>
      <TableComponent
        columns={columns}
        data={dataTable}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record._id);
            },
          };
        }}
      />
    </div>
  );
};
