const boom = require("@hapi/boom");
const openpay = require("../libs/openpay");

class CustomerService {
  constructor() {}

  async find(callback) {
    return openpay.customers.list(callback);
  }

  async findOne(customerId, cb) {
    return openpay.customers.get(customerId, cb);
  }

  async create(data, cb) {
    const customerRequest = {
      ...data,
      phone_number: data.phone,
      requires_account: false,
    };
    delete customerRequest.phone;
    return openpay.customers.create(customerRequest, cb);
  }

  async update(customerId, data, cb) {
    const customerRequest = {
      ...data,
      phone_number: data.phone,
    };
    return openpay.customers.update(customerId, customerRequest, cb);
  }

  async delete(customerId, cb) {
    return openpay.customers.delete(customerId, cb);
  }
}

module.exports = CustomerService;
