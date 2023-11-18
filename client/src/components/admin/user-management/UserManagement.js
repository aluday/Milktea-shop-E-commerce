import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader } from "./UserManagementWrapper";
import { Menu, Button, Space } from "antd";
import {
  UserOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getItem } from "../../../services/common";
import TableComponent from "../../shared-components/Table";
import InputComponent from "../../shared-components/Input";
import ModalComponent from "../../shared-components/Modal";
import * as messages from "../../../services/messages";

export const UserManagement = () => {
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const searchInput = useRef(null);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => {}}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {}}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {}}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          onClick={() => {}}
        />
      </div>
    );
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("email"),
    },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   sorter: (a, b) => a.address.length - b.address.length,
    //   // ...getColumnSearchProps('address')
    // },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      filters: [
        {
          text: "True",
          value: "TRUE",
        },
        {
          text: "False",
          value: "FALSE",
        },
      ],
      onFilter: (value, record) => record.isAdmin === value,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTable = [];

  return (
    <div>
      <WrapperHeader>Quản lí người dùng</WrapperHeader>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                // setRowSelected(record._id)
              },
            };
          }}
        />
        <ModalComponent
          title="Xóa người dùng"
          open={isModalOpenDelete}
          onCancel={() => {}}
          onOk={() => {}}
        >
          <div>Bạn có chắc xóa tài khoản này không?</div>
        </ModalComponent>
      </div>
    </div>
  );
};

export default UserManagement;
