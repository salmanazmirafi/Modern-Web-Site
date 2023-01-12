const {
  order,
  singleOrder,
  meOrder,
  adminAllOrder,
  updateOrderStatus,
  orderDeleted,
} = require("../controller/orderCon");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const route = require("express").Router();

//-------------------User----------------
/**
 * Order
 * Create New User
 * Name , Email , password , Avatar
 * @route "http://localhost/api/v1/auth/register"
 * @method POST
 * @visibility public
 */
route.post("/order/new", isAuthenticatedUser, order);

/**
 * Order Single
 * Create New User
 * Name , Email , password , Avatar
 * @route "http://localhost/api/v1/auth/register"
 * @method GET
 * @visibility public
 */
route.get("/order/:id", isAuthenticatedUser, singleOrder);

/**
 * Order Single
 * Create New User
 * Name , Email , password , Avatar
 * @route "http://localhost/api/v1/auth/register"
 * @method GET
 * @visibility public
 */
route.get("/order", isAuthenticatedUser, meOrder);

//-------------------Admin----------------

/**
 * Get Order All
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @method GET
 * @route "http://localhost/api/v1/admin/order
 * @visibility private
 */
route.get(
  "/admin/orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  adminAllOrder
);

/**
 * Update Order Status
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @method PUT
 * @route "http://localhost/api/v1/admin
 * @visibility private
 */
route.put(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateOrderStatus
);

/**
 * Delete Order
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @method DELETE
 * @route "http://localhost/api/v1/admin
 * @visibility private
 */
route.delete(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  orderDeleted
);

module.exports = route;
