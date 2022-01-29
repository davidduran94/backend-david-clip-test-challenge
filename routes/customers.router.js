const express = require("express");
const CustomerService = require("../services/customers.service");
const validationHandler = require("../middlewares/validator.handler");
const {
  createCustomerSchema,
  getCustomerSchema,
  deleteCustomerSchema,
  updateCustomerSchema,
  updateCustomerIDSchema,
} = require("../schemas/customers.schema");

const router = express.Router();
const service = new CustomerService();

router.get("/", async (req, res, next) => {
  try {
    await service.find((error, body) => {
      if (error) {
        return res.status(500).json(error);
      } else return res.status(200).json(body);
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validationHandler(createCustomerSchema, "body"),
  async (req, res, next) => {
    try {
      await service.create(req.body, (error, body) => {
        if (error) res.status(500).json(error);
        else res.status(201).json(body);
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validationHandler(updateCustomerIDSchema, "params"),
  validationHandler(updateCustomerSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      await service.update(id, body, (error, body) => {
        if (!error) return res.status(201).json(body);
        return res.status(500).json(error);
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validationHandler(deleteCustomerSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id, (error, body) => {
        console.log("deleted...", error, body);
        if (!error) return res.status(200).json({ message: "success" });
        return res.status(500).json(error);
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
