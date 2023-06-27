const express = require("express");
const axios = require("axios");
const { apiKey, apiSecret } = require("./config");

const app = express();
app.use(express.json());

app.post("/api/v1/initialize-transaction", async (req, res) => {
  try {
    const {
      publicKey,
      amount,
      currency,
      country,
      paymentReference,
      email,
      productId,
      productDescription,
      callbackUrl,
    } = req.body;

    const response = await axios.post(
      "https://api.budpay.ng/api/v2/payments",
      {
        publicKey,
        amount,
        currency,
        country,
        paymentReference,
        email,
        productId,
        productDescription,
        callbackUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (response.data.success) {
      res.json({ success: true, link: response.data.redirectLink });
    } else {
      res.json({
        success: false,
        message: "Failed to initialize transaction.",
      });
    }
  } catch (error) {
    console.error("Error initializing transaction:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while initializing the transaction.",
      });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
