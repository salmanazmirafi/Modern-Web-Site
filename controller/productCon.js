const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/Product");
const ErrorHandler = require("../utils/erorHeandelar");

//-------------------User----------------
// Product All
exports.allProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.find();
    res.status(200).json({ product });
  } catch (err) {
    next(new ErrorHandler(err));
  }
});

// Product Detailers
exports.productDetailers = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;
  try {
    const productDetails = await Product.findById(productId);
    if (!productDetails) return next(new ErrorHandler("Product Not Found"));
    res.status(200).json({ productDetails });
  } catch (err) {
    next(new ErrorHandler(err));
  }
});

//-------------------Admin----------------
// Admin Product All
exports.adminAllProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.find();
    res.status(200).json({ product });
  } catch (err) {
    next(new ErrorHandler(err));
  }
});

// Admin Product Detailers
exports.adminProductDetailers = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;
  try {
    const productDetails = await Product.findById(productId);
    if (!productDetails) return next(new ErrorHandler("Product Not Found"));
    res.status(200).json({ productDetails });
  } catch (err) {
    next(new ErrorHandler(err));
  }
});

// New Product
exports.newProduct = catchAsyncErrors(async (req, res, next) => {});

// Update Product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {});

// All Reviews
exports.allReviews = catchAsyncErrors(async (req, res, next) => {});

// New Review
exports.newReviews = catchAsyncErrors(async (req, res, next) => {});

// Update Review
exports.updateReview = catchAsyncErrors(async (req, res, next) => {});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {});
