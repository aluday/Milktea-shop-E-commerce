import React, { useEffect, useState } from "react";
import TableComponent from "../../shared-components/Table";
import * as messages from "../../../services/messages";
import { getAllUsers, handleError } from "../../../services/endpoint-services";
import moment from "moment";

export const UserManagement = () => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const displayedColumns = [
    {
      title: "#",
      dataIndex: "columnNo",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
    },
  ];

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        if (res.status) {
          // filter all users without account
          const newListOfUsers = res.users.filter((item) => item.username);
          const displayedData = newListOfUsers.map((item, index) => ({
            columnNo: index + 1,
            name: item.name,
            username: item.username,
            email: item.email,
            phone: item.phone,
            address: item.address || "-",
            isAdmin: item.isAdmin ? "Yes" : "No",
            createdAt: moment(item.createdAt).format("DD/MM/YYYY, h:mm:ss A"),
          }));
          setListOfUsers(displayedData);
        }
      })
      .catch((err) => {
        handleError(err);
      });
  }, []);

  return (
    <div>
      <h2>Quản lí người dùng</h2>
      <div style={{ marginTop: "20px" }}>
        <TableComponent columns={displayedColumns} data={listOfUsers} />
      </div>
    </div>
  );
};

export default UserManagement;
