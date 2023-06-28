const express = require("express");
const axios = require("axios");
const { apiPublicKey, apiSecretKey } = require("./config");

const app = express();
app.use(express.json());

app.post("/api/v1/initialize-transaction", async (req, res) => {
  try {
    const {
      amount,
      cardNumber,
      cardExpMonth,
      cardExpYear,
      cardCvv,
      reference,
      email,
      currency,
    } = req.body;

    const response = await axios.post(
      "https://api.budpay.com/api/v2/transaction/initialize",
      {
        amount,
        cardNumber,
        cardExpMonth,
        cardExpYear,
        cardCvv,
        reference,
        email,
        currency,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiPublicKey,
          "X-API-Secret": apiSecretKey,
        },
      }
    );

    if (response.data.success) {
      res.json({ success: true, message: "Payment successful!" });
    } else {
      res.json({ success: false, message: "Payment failed." });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the payment.",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
