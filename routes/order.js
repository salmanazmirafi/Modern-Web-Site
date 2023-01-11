const { order, singleOrder, meOrder } = require("../controller/orderCon");
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
 * Get All User Find Adn Query
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @method POST
 * @route "http://localhost/api/v1/admin
 * @visibility private
 */
route.post("/admin", isAuthenticatedUser, authorizeRoles("admin"));

module.exports = route;
