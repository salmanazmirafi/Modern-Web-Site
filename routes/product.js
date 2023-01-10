const {
  allProduct,
  productDetailers,
  adminAllProduct,
  adminProductDetailers,
} = require("../controller/productCon");
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

/**
 * Single User
 * @route "http://localhost/api/v1/product/:id
 * @visibility public
 */
route.get("/product/:id", isAuthenticatedUser, productDetailers);

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

/**
 * Product Detailers
 * @route "http://localhost/api/v1/admin/product/:id
 *  @method GET
 * @visibility privet
 */
route.get(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  adminProductDetailers
);

/**
 * New Product
 * @route "http://localhost/api/v1/admin/product/:id
 *  @method POST
 * @visibility privet
 */
route.post("/admin/product/new", isAuthenticatedUser, authorizeRoles("admin"));

/**
 * Single User
 * @route "http://localhost/api/v1/admin/product/:id
 *  @method PUT
 * @visibility privet
 */
route.put("/admin/product/:id", isAuthenticatedUser, authorizeRoles("admin"));

/**
 * Single User
 * @route "http://localhost/api/v1/admin/product/:id
 *  @method DELETE
 * @visibility privet
 */
route.delete(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin")
);

//-------------------Review----------------

module.exports = route;
