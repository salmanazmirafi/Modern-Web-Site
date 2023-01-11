const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../models/Order");
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
