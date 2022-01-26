const boom = require("@hapi/boom");

class CustomerService {
  constructor() {}

  async find() {
    return { client: "3" };
  }

  async findOne(id) {}

  async create(data) {}

  async update(id, changes) {}

  async delete(id) {}
}

module.exports = CustomerService;
