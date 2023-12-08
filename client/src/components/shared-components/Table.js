import React, { useState, useMemo } from "react";
import { Table } from "antd";

const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data: dataSource = [],
    columns = [],
    handleDeleteMany,
  } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== "action");
    return arr;
  }, [columns]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User',
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };
  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys);
  };

  return (
    <div>
      {/* {!!rowSelectedKeys.length && (
        <div className="deleleAllBtn" onClick={handleDeleteAll}>
          Xóa tất cả
        </div>
      )} */}
      <Table
        // rowSelection={{
        //   type: selectionType,
        //   ...rowSelection,
        // }}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20"],
        }}
        scroll={{
          x: 500,
          y: 300,
        }}
        {...props}
      />
    </div>
  );
};

export default TableComponent;
