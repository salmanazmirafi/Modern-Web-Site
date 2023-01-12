const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../models/Order");
const Product = require("../models/Product");
const ErrorHandler = require("../utils/erorHeandelar");

//-------------------User----------------
// New Order
exports.order = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  try {
    res.status(201).json(order);
  } catch (err) {
    next(new ErrorHandler(err));
  }
});

// Single Order
exports.singleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// ME Order
exports.meOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await Order.find({ user: req.user.id });

    res.status(200).json(order);
  } catch (err) {
    next(new ErrorHandler(err));
  }
});

//------------------Admin------------------

// Get All Order
exports.adminAllOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await Order.find();
    if (!order) return next(new ErrorHandler("Order Not Found", 400));

    let totalAmount = 0;

    order.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({ order, totalAmount });
  } catch (err) {
    next(new ErrorHandler(err));
  }
});
// Update Order
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order)
    return next(new ErrorHandler("Order not found with this Id", 404));

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  console.log(req.body);
  console.log(req.body.orderStatus);

  if (req.body.orderStatus === "Shipped") {
    order.orderItems.forEach(async (o) => {
      console.log(o.product);
      console.log("====================================");
    });
  }
  res.status(202).json(order);
});

// Update Quantity
async function updateStork(id, quantity) {
  const productFind = await Product.findById(id);

  productFind.Stock -= quantity;
  await productFind.save({ validateBeforeSave: false });
}
// Delete Order

exports.orderDeleted = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new ErrorHandler("Order Not Found This ID"));
  try {
    await order.remove();
    res.status(200).json({ message: "Order Deleted Successful" });
  } catch (err) {
    next(new ErrorHandler(err));
  }
});
