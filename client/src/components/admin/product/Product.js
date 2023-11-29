import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import InputComponent from "../../shared-components/Input";
import ModalComponent from "../../shared-components/Modal";
import Loading from '../../shared-components/Loading';
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
  handleError,
} from "../../../services/endpoint-services";

export const Product = () => {
  const [isLoading, setIsLoading] = useState(false);
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
  const [rowSelected, setRowSelected] = useState("");
  /* Ending variables for ProductList component */

  /* Starting variables for ProductDetails component */
  const [isOpenProductDetailsModal, setIsOpenProductDetailsModal] =
    useState(false);
  const [productDetailsForm] = Form.useForm();
  const [productId, setProductId] = useState("");
  /* Ending variables for ProductDetails component */

  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const searchInput = useRef(null);
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
        setIsLoading(true);
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
          productDetailsForm.setFieldValue(
            "discount",
            productData.discount
          );
          setCountInStock(productData.countInStock);
          productDetailsForm.setFieldValue("type", productData.type);
          setType(productData.type);
          productDetailsForm.setFieldValue("size", productData.size);
          productDetailsForm.setFieldValue("image", productData.image);
          setImage(productData.image);
          setIsOpenProductDetailsModal(true);
        }
      })
      .catch((err) => {
        setIsLoading(true);
        handleError(err);
        resetProductFormData();
        messages.error();
      });
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div className="searchContainer" onKeyDown={(e) => e.stopPropagation()}>
        <InputComponent
          className="searchInput"
          ref={searchInput}
          placeholder={`Tìm kiếm tên sản phẩm`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => {
            confirm();
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              confirm();
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
            }}
            size="small"
            style={{ width: 90 }}
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

  const displayedColumns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      ...getColumnSearchProps("productName"),
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
    const sizeData =
      action === "add"
        ? productForm.getFieldValue("size")
        : productDetailsForm.getFieldValue("size");
    const formData = new FormData();
    formData.append("productName", productForm.getFieldValue("productName"));
    formData.append("basicPrice", productForm.getFieldValue("basicPrice"));
    formData.append("discount", productForm.getFieldValue("discount"));
    formData.append("type", productForm.getFieldValue("type"));
    formData.append("countInStock", productForm.getFieldValue("countInStock"));
    formData.append("size", JSON.stringify(sizeData));
    formData.append("image", productForm.getFieldValue("image"));

    if (action === "add") {
      createProduct(formData)
        .then((res) => {
          if (res.status === 200) {
            setIsLoading(false);
            resetProductFormData("add");
            setForceRerender((cur) => cur + 1);
            messages.success();
          }
        })
        .catch((err) => {
          setIsLoading(false);
          handleError(err);
          resetProductFormData("add");
          messages.error();
        });
    } else if (action === "update") {
      updateProduct(formData, productId)
        .then(() => {
          setIsLoading(false);
          resetProductFormData("update");
          setForceRerender((cur) => cur + 1);
          messages.success();
        })
        .catch((err) => {
          setIsLoading(false);
          handleError(err);
          resetProductFormData("update");
          messages.error();
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
      setImage(e.file.originFileObj);
    } else {
      setType(e);
    }
  };

  const handleSelectRow = (record, index) => {
    // console.log("record", index);
  };

  const handleDeleteProduct = () => {
    deleteProduct(productId)
      .then((res) => {
        if (res.status === 200) {
          messages.success();
          setShowConfirmDeleteDialog(false);
          setForceRerender((cur) => cur + 1);
        }
      })
      .catch((err) => {
        handleError(err);
        resetProductFormData("update");
        messages.error();
      });
  };

  const resetProductFormData = (action) => {
    if (action === "add") {
      productForm.resetFields();
      setIsProductModalOpen(false);
    } else if (action === "update") {
      productDetailsForm.resetFields();
      setIsOpenProductDetailsModal(false);
    }
    setProductName("");
    setBasicPrice("");
    setDiscount("");
    setType("");
    setCountInStock(0);
    setSizeValue("");
    setPrice("");
    setImage("");
  };

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        if (res.data && res.data.products) {
          const productData = res.data.products.map((obj) => ({
            key: obj._id,
            ...obj,
          }));
          setProductList(productData);
        }
      })
      .catch((err) => {
        handleError(err);
      });
  }, [forceRerender]);

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
        isProductModalOpen={isProductModalOpen}
        handleChange={handleCreateUpdateProductFormChange}
        handleOpenProductModal={() => {
          setIsProductModalOpen(true);
        }}
        handleCloseProductModal={() => {
          setIsProductModalOpen(false);
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
        handleSelectRow={handleSelectRow}
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
        isProductModalOpen={isOpenProductDetailsModal}
        handleChange={handleCreateUpdateProductFormChange}
        handleOpenProductModal={() => {
          setIsOpenProductDetailsModal(true);
        }}
        handleCloseProductModal={() => {
          setIsOpenProductDetailsModal(false);
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
