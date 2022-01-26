const { config } = require("../config");
const Openpay = require("openpay");
const isProduction = config.env === "dev" ? false : false;

const openpay = new Openpay(
  `${config.sandbox_id}`,
  `${config.sandbox_private_key}`
);

openpay.setTimeout(30000);

module.exports = openpay;
