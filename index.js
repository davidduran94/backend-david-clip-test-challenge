const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const routerApi = require("./routes");
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/error.handler");

app.use(express.json());

const whitelist = [
  "http://localhost:3001",
  "https://pacific-fjord-47474.herokuapp.com",
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};
app.use(cors(options));

app.get("/", (req, res) => {
  res.send("Hola mi server en express");
});
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on port port ${port}`);
});
