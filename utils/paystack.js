const config = require("./config");
const Paystack  = require('@paystack/paystack-sdk')
// const paystack = new Paystack(config.SECRET_KEY)



const paystack = (req) => {
  const SecretKey = config.SECRET_KEY;

  const initializePayment = async (form, mycb) => {
    const options = {
      url: "https://api.paystack.co/transaction/initialize",
      headers: {
        authorization: SecretKey,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
      form,
    };

    const cb = (err, res, body) => {
      return mycb(err, body);
    };

    req.post(options, cb);
  };

  const verifyPayment = async (ref, mycb) => {
    const options = {
      url:
        "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref),
      headers: {
        authorization: MySecretKey,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    };

    const cb = (err, res, body) => {
      return mycb(err, body);
    };
    req(options, cb);
  };

  return { initializePayment, verifyPayment };
};

module.exports = paystack;
