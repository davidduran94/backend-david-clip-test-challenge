require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "dev",
  port: process.env.PORT || 3000,
  sandbox_url: process.env.API_SANDBOX_API,
  sandbox_id: process.env.SANDBOX_ID,
  sandbox_private_key: process.env.SANDBOX_PRIVATE_KEY,
};

module.exports = { config };
