// const axios = require("axios");

// axios({
//   method: "post",
//   url: "https://api.stripe.com/v1/products",
//   data: {
//     name: "new_product_viral",
//     description: "amazing product by viral rupani.",
//   },
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//     Authorization:
//       "Bearer sk_test_51Ls1X7SHdLazudTuypO7XZJE8sdeph0erg3NGaNOfiAcsCYUPYPObtjRezRZ0c4uOM5krFwXWKQRxUM60kuJgvyW00zrSsehhW",
//   },
// }).then((response) => console.log(response.status));

const stripe = require("stripe")(
  "sk_test_51Ls1X7SHdLazudTuypO7XZJE8sdeph0erg3NGaNOfiAcsCYUPYPObtjRezRZ0c4uOM5krFwXWKQRxUM60kuJgvyW00zrSsehhW"
);

// const price = stripe.prices.create({
//   currency: "inr",
//   product: "prod_NtSHDagI9LOWNf",
//   unit_amount: 1200,
//   recurring: { interval: "month" },
// });

stripe.prices.list({
  limit: 3,
}).then(product => console.log(product))
