// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    user,
    token,
  });
};

module.exports = sendToken;
