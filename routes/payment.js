const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const route = require("express").Router();

//-------------------User----------------

/**
 * All Product And Query
 * @route "http://localhost/api/v1/product?sort["by","name"]"
 * @method GET
 * @visibility public
 */
route.get("/product", isAuthenticatedUser, allProduct);

//-------------------Admin----------------

/**
 * All Product And Query
 * @route "http://localhost/api/v1/admin/product?sort["by","name"]"
 * @method GET
 * @visibility privet
 */
route.get(
  "/admin/product",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  adminAllProduct
);

module.exports = route;
