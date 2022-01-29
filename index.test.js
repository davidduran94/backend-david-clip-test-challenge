const request = require("supertest");
const express = require("express");
const router = express.Router();
const customersRouter = require("./routes/customers.router");

const app = new express();
app.use(express.json());
app.use("/api/v1", router);
router.use("/customers", customersRouter);

describe("App Routes", function () {
  test("responds OK with a JSON to GET customers", async () => {
    const res = await request(app).get("/api/v1/customers");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("responds OK to POST customers", async () => {
    const res = await request(app)
      .post("/api/v1/customers")
      .send({
        name: "cool",
        email: "description@mail.com",
        phone: "45298",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(201);
  });

  test("responds FAIL to POST customer no name", async () => {
    const res = await request(app)
      .post("/api/v1/customers")
      .send({
        email: "description@mail.com",
        phone: "45298",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(500);
  });

  test("responds FAIL to POST customer no phone", async () => {
    const res = await request(app)
      .post("/api/v1/customers")
      .send({
        name: "davidd",
        email: "description@mail.com",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(500);
  });

  test("responds FAIL to POST customer wrong email", async () => {
    const res = await request(app)
      .post("/api/v1/customers")
      .send({
        name: "daviddr",
        email: "dsdfsdfs",
        phone: "45298",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(500);
    expect(res.text).toContain("must be a valid email");
  });

  test("responds OK to PATCH customer", async () => {
    const id = "aiycpbltiirfv9nt53qz";
    const res = await request(app)
      .patch(`/api/v1/customers/${id}`)
      .send({
        name: "daviddr",
        email: "dsdfsdfs@mail.com.mx",
        phone: "45298",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(201);
    expect(res.text).toContain(id);
  });

  test("responds FAIL to PATCH customer wrong email", async () => {
    const id = "aiycpbltiirfv9nt53qz";
    const res = await request(app)
      .patch(`/api/v1/customers/${id}`)
      .send({
        name: "daviddr",
        email: "dsd34eda",
        phone: "45298",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(500);
    expect(res.text).toContain("must be a valid");
  });

  test("responds FAIL to DELETE customer that not exist", async () => {
    const id = "a13qtsva301io6vogqcs";
    const res = await request(app)
      .delete(`/api/v1/customers/${id}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(500);
    expect(res.text).toContain("does not exist");
  });
});
