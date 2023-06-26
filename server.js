const express = require("express");
const axios = require("axios");
const { apiKey, apiSecret } = require("./config");

const app = express();
app.use(express.json());

app.post("/api/v1/process-payment", async (req, res) => {
  try {
    const { amount, cardNumber, cardExpMonth, cardExpYear, cardCvv } = req.body;

    const response = await axios.post(
      "https://apis.budpay.ng/api/v2/payments",
      {
        amount,
        cardNumber,
        cardExpMonth,
        cardExpYear,
        cardCvv,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
          "X-API-Secret": apiSecret,
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
