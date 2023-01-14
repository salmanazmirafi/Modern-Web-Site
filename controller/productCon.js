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
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log(req.user.id);
    req.body.user = req.user.id;
    const product = await Product(req.body);
    const saveProduct = await product.save();
    res
      .status(200)
      .json({ message: "Product Create Successfully", saveProduct });
  } catch (err) {
    next(new ErrorHandler(err));
  }
});

// Update Product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = await Product.findById(req.params.id);
    if (!productId) return next(new ErrorHandler("Product Not Found", 400));
    const updateProduct = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: true,
    });
    res.status(203).json({ message: "Update Successfully", updateProduct });
  } catch (err) {
    next(new ErrorHandler(err));
  }
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const productID = await Product.findById(req.params.id);
  if (!productID) return next(new ErrorHandler("Product Not Found", 404));
  try {
    await Product.findByIdAndRemove(productID);
    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (err) {
    next(new ErrorHandler(err));
  }
});

// All Reviews
exports.allReviews = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id);
    if (!product) return next(new ErrorHandler("Product Not Found", 400));

    res.status(200).json(product.reviews);
  } catch (err) {
    next(new ErrorHandler(err));
  }
});

// New Review
exports.newReviews = catchAsyncErrors(async (req, res, _next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
