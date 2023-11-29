/* STARTING CONSTANT DEFINITIONS */
export const PRODUCT_TYPES = [
  { type: "yogurt", value: "Sữa chua" },
  { type: "milkTea", value: "Trà sữa" },
  { type: "coffee", value: "Cà phê" },
];
/* ENDING CONSTANT DEFINITIONS */

/* STARTING ENDPOINT URL DEFINITIONS */
export const EndpointConstants = {
  USER: {
    SIGN_IN: "/sign-in",
    CREATE_USER: "/create-user",
    AUTHORIZE: "/authorize",
    PRODUCT_DETAILS: "/product-detail",
    CREATE_ORDER: "/order/create-order",
    PRODUCT_TYPES: "/type"
  },
  ADMIN: {
    CREATE_PRODUCT: "/admin/create-product",
    UPDATE_PRODUCT: "/admin/update-product",
    DELETE_PRODUCT: "/admin/delete-product",
    CREATE_PRODUCT_TYPE: "/admin/create-type",
    UPDATE_PRODUCT_TYPE: "/admin/update-type",
    DELETE_PRODUCT_TYPE: "/admin/delete-type",
  },
};
/* ENDING ENDPOINT URL DEFINITIONS */
