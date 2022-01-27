const Joi = require("joi");

const name = Joi.string().min(3).max(30);
const email = Joi.string().email();
const lastName = Joi.string();
const id = Joi.string();
const phone = Joi.string();
const address = Joi.object({
  city: Joi.string(),
  state: Joi.string(),
  line1: Joi.string(),
  line2: Joi.string(),
  postal_code: Joi.string(),
  country_code: Joi.string(),
});

const getCustomerSchema = Joi.object({});

const deleteCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.optional(),
  phone: phone.optional(),
  email: email.required(),
  address: address.optional(),
});

const updateCustomerSchema = Joi.object({
  name: name.optional(),
  lastName: lastName.optional(),
  phone: phone.optional(),
  email: email.optional(),
});

const updateCustomerIDSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
  updateCustomerIDSchema,
  deleteCustomerSchema,
};
