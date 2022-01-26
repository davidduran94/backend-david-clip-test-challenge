const boom = require("@hapi/boom");
const openpay = require("../libs/openpay");

class CustomerService {
  constructor() {}

  async find() {
    return { client: "3" };
  }

  async findOne(id) {}

  async create(data, cb) {
    console.log("creatinggg");
    const customerRequest = {
      ...data,
      requires_account: false,
    };
    return openpay.customers.create(customerRequest, cb);
  }

  async update(id, changes) {}

  async delete(id) {}
}

module.exports = CustomerService;
