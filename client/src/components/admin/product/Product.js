import React, { useEffect, useRef, useState } from "react";
import { Form } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  // SearchOutlined,
} from "@ant-design/icons";
// import InputComponent from "../../shared-components/Input";
import ModalComponent from "../../shared-components/Modal";
import Loading from "../../shared-components/Loading";
import { ProductForm } from "./ProductForm";
import { ProductList } from "./ProductList";
import * as messages from "../../../services/messages";
import "./Product.css";
import {
  createProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
  getAllProductTypes,
  handleError,
} from "../../../services/endpoint-services";
// import mockData from "../../../mockData.json";

export const Product = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productTypes, setProductTypes] = useState([]);
  /* Starting variables for AddProduct component */
  const [productForm] = Form.useForm();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [basicPrice, setBasicPrice] = useState(0);
  const [discount, setDiscount] = useState("");
  const [type, setType] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [sizeValue, setSizeValue] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  /* Ending variables for AddProduct component */

  /* Starting variables for ProductList component */
  const [productList, setProductList] = useState([]);
  // const [rowSelected, setRowSelected] = useState("");
  /* Ending variables for ProductList component */

  /* Starting variables for ProductDetails component */
  const [isOpenProductDetailsModal, setIsOpenProductDetailsModal] =
    useState(false);
  const [productDetailsForm] = Form.useForm();
  const [productId, setProductId] = useState("");
  /* Ending variables for ProductDetails component */

  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  // const searchInput = useRef(null);
  const [forceRerender, setForceRerender] = useState(1);

  const renderActions = (_, record) => {
    return (
      <div className="tableActions">
        <EditOutlined
          className="edit"
          onClick={() => {
            handleUpdateProduct(record._id);
            setProductId(record._id);
          }}
        />
        <DeleteOutlined
          className="delete"
          onClick={() => {
            setShowConfirmDeleteDialog(true);
            setProductId(record._id);
          }}
        />
      </div>
    );
  };

  const handleUpdateProduct = (productId) => {
    setIsLoading(true);
    getProductDetails(productId)
      .then((res) => {
        setIsLoading(false);
        if (res.data && res.data.product) {
          const productData = res.data.product;
          // set product form data
          productDetailsForm.setFieldValue(
            "productName",
            productData.productName
          );
          setProductName(productData.productName);
          productDetailsForm.setFieldValue(
            "basicPrice",
            productData.basicPrice
          );
          setBasicPrice(productData.basicPrice);
          productDetailsForm.setFieldValue(
            "countInStock",
            productData.countInStock
          );
          setDiscount(productData.discount);
          productDetailsForm.setFieldValue("discount", productData.discount);
          setCountInStock(productData.countInStock);
          productDetailsForm.setFieldValue("type", productData.type);
          setType(productData.type);
          productDetailsForm.setFieldValue("size", productData.size);
          productDetailsForm.setFieldValue("image", productData.image);
          setImage(productData.image);
          setIsOpenProductDetailsModal(true);
        } else {
          messages.errorNotification("Error!", res.message);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        handleError(err);
        resetProductFormData();
      });
  };

  // const getColumnSearchProps = (dataIndex) => ({
  //   filterDropdown: ({
  //     setSelectedKeys,
  //     selectedKeys,
  //     confirm,
  //     clearFilters,
  //   }) => (
  //     <div className="searchContainer" onKeyDown={(e) => e.stopPropagation()}>
  //       <InputComponent
  //         className="searchInput"
  //         ref={searchInput}
  //         placeholder={`Tìm kiếm tên sản phẩm`}
  //         value={selectedKeys[0]}
  //         onChange={(e) =>
  //           setSelectedKeys(e.target.value ? [e.target.value] : [])
  //         }
  //         onPressEnter={() => {
  //           confirm();
  //         }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => {
  //             confirm();
  //           }}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Search
  //         </Button>
  //         <Button
  //           onClick={() => {
  //             clearFilters();
  //           }}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Reset
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: (filtered) => (
  //     <SearchOutlined
  //       style={{
  //         color: filtered ? "#1890ff" : undefined,
  //       }}
  //     />
  //   ),
  //   onFilter: (value, record) =>
  //     record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  //   onFilterDropdownOpenChange: (visible) => {
  //     if (visible) {
  //       setTimeout(() => searchInput.current?.select(), 100);
  //     }
  //   },
  // });

  const displayedColumns = [
    {
      title: "#",
      dataIndex: "columnNo",
      width: 50,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      // ...getColumnSearchProps("productName"),
    },
    {
      title: "Giá",
      dataIndex: "basicPrice",
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
    },
    {
      title: "Hàng trong kho",
      dataIndex: "countInStock",
    },
    {
      title: "Chỉnh sửa",
      dataIndex: "action",
      render: renderActions,
    },
  ];

  const handleCreateOrUpdateProduct = (action) => {
    setIsLoading(true);

    if (action === "add") {
      const sizeData = productForm.getFieldValue("size");
      const formData = new FormData();
      formData.append("productName", productForm.getFieldValue("productName"));
      formData.append("basicPrice", productForm.getFieldValue("basicPrice"));
      formData.append("discount", productForm.getFieldValue("discount"));
      formData.append("type", productForm.getFieldValue("type"));
      formData.append(
        "countInStock",
        productForm.getFieldValue("countInStock")
      );
      formData.append("size", JSON.stringify(sizeData));
      formData.append(
        "image",
        productForm.getFieldValue("image").file.originFileObj
      );

      createProduct(formData)
        .then((res) => {
          if (res.status === 200) {
            setIsLoading(false);
            setIsProductModalOpen(false);
            resetProductFormData();
            setForceRerender((cur) => cur + 1);
            messages.successNotification(
              "Success!",
              "Tạo sản phẩm thành công."
            );
          } else {
            messages.errorNotification("Error!", res.message);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          handleError(err);
          resetProductFormData();
          setIsProductModalOpen(false);
        });
    } else if (action === "update") {
      const sizeData = productDetailsForm.getFieldValue("size");
      const formData = new FormData();
      formData.append(
        "productName",
        productDetailsForm.getFieldValue("productName")
      );
      formData.append(
        "basicPrice",
        productDetailsForm.getFieldValue("basicPrice")
      );
      formData.append("discount", productDetailsForm.getFieldValue("discount"));
      formData.append("type", productDetailsForm.getFieldValue("type"));
      formData.append(
        "countInStock",
        productDetailsForm.getFieldValue("countInStock")
      );
      formData.append("size", JSON.stringify(sizeData));
      if (
        productDetailsForm.getFieldValue("image") &&
        productDetailsForm.getFieldValue("image").file &&
        productDetailsForm.getFieldValue("image").file.originFileObj
      ) {
        formData.append(
          "image",
          productDetailsForm.getFieldValue("image").file.originFileObj
        );
      }

      updateProduct(formData, productId)
        .then((res) => {
          if (res && res.status) {
            messages.successNotification(
              "Success!",
              "Cập nhật sản phẩm thành công."
            );
          } else {
            messages.errorNotification("Error!", res.message);
          }
          setIsLoading(false);
          resetProductFormData();
          setIsOpenProductDetailsModal(false);
          setForceRerender((cur) => cur + 1);
        })
        .catch((err) => {
          setIsLoading(false);
          handleError(err);
          resetProductFormData();
          setIsOpenProductDetailsModal(false);
        });
    }
  };

  const handleCreateUpdateProductFormChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      if (name === "productName") {
        setProductName(value);
      } else if (name === "basicPrice") {
        setBasicPrice(value);
      } else if (name === "discount") {
        setDiscount(value);
      } else if (name === "countInStock") {
        setCountInStock(value);
      } else if (name === "sizeValue") {
        setSizeValue(value);
      } else if (name === "price") {
        setPrice(value);
      }
    } else if (typeof e === "object") {
      setImage(e.file);
    } else {
      setType(e);
    }
  };

  // const handleSelectRow = (record, index) => {
  //   console.log("record", index);
  // };

  const handleDeleteProduct = () => {
    deleteProduct(productId)
      .then((res) => {
        if (res.status === 200) {
          messages.successNotification("Success!", "Xóa sản phẩm thành công.");
          setShowConfirmDeleteDialog(false);
          setForceRerender((cur) => cur + 1);
        } else {
          messages.errorNotification("Error!", res.message);
        }
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const resetProductFormData = () => {
    productForm.resetFields();
    productDetailsForm.resetFields();
    setProductName("");
    setBasicPrice("");
    setDiscount("");
    setType("");
    setCountInStock(0);
    setSizeValue("");
    setPrice("");
    setImage(null);
  };

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        if (res.data && res.data.products) {
          const productData = res.data.products.map((obj, index) => ({
            key: obj._id,
            columnNo: index + 1,
            productName: obj.productName,
            basicPrice: obj.basicPrice,
            discount: obj.discount,
            countInStock: obj.countInStock,
            ...obj
          }));
          setProductList(productData);
        }
      })
      .catch((err) => {
        handleError(err);
      });
  }, [forceRerender]);

  useEffect(() => {
    getAllProductTypes()
      .then((res) => {
        if (res && res.status && res.data.length > 0) {
          const productTypeData = res.data.map((item, index) => ({
            _id: item._id,
            typeName: item.type_name,
          }));
          setProductTypes(productTypeData);
          setIsLoading(false);
        } else {
          messages.error("Error!", res.message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        handleError(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Quản lý sản phẩm</h2>
      <Loading isLoading={isLoading} />
      {/* Starting Add Product Form modal */}
      <ProductForm
        title="Thêm sản phẩm"
        isShowAddBtn
        productForm={productForm}
        productName={productName}
        basicPrice={basicPrice}
        discount={discount}
        type={type}
        countInStock={countInStock}
        sizeValue={sizeValue}
        price={price}
        image={image}
        productTypes={productTypes}
        isProductModalOpen={isProductModalOpen}
        handleChange={handleCreateUpdateProductFormChange}
        handleOpenProductModal={() => {
          setIsProductModalOpen(true);
        }}
        handleCloseProductModal={() => {
          setIsProductModalOpen(false);
          resetProductFormData();
        }}
        handleCreateProduct={() => {
          handleCreateOrUpdateProduct("add");
        }}
      />
      {/* Ending Add Product Form modal */}

      {/* Starting Product list */}
      <ProductList
        columns={displayedColumns}
        dataTable={productList}
        // handleSelectRow={handleSelectRow}
      />
      {/* Ending Product list */}

      {/* Starting Update Product Form modal */}
      <ProductForm
        title="Sửa sản phẩm"
        isShowAddBtn={false}
        productForm={productDetailsForm}
        productName={productName}
        basicPrice={basicPrice}
        discount={discount}
        type={type}
        countInStock={countInStock}
        sizeValue={sizeValue}
        price={price}
        image={image}
        productTypes={productTypes}
        isProductModalOpen={isOpenProductDetailsModal}
        handleChange={handleCreateUpdateProductFormChange}
        handleOpenProductModal={() => {
          setIsOpenProductDetailsModal(true);
        }}
        handleCloseProductModal={() => {
          setIsOpenProductDetailsModal(false);
          resetProductFormData();
        }}
        handleCreateProduct={() => {
          handleCreateOrUpdateProduct("update");
        }}
      />
      {/* Ending Update Product Form modal */}

      <ModalComponent
        title="Xóa sản phẩm"
        open={showConfirmDeleteDialog}
        onCancel={() => {
          setShowConfirmDeleteDialog(false);
        }}
        onOk={handleDeleteProduct}
      >
        <div>Bạn có chắc xóa sản phẩm này không?</div>
      </ModalComponent>
    </div>
  );
};

export default Product;
