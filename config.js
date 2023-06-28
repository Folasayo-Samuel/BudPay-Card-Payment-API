require("dotenv").config();

module.exports = {
  apiPublicKey: process.env.BUDPAY_PUBLIC_KEY,
  apiSecretKey: process.env.BUDPAY_SECRET_KEY,
};
