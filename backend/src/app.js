const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const config = require("./config");
const { apiLimiter } = require("./middleware/rateLimit");
const { notFound, errorHandler } = require("./middleware/error");
const routes = require("./routes");

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json({ limit: "1mb" }));
app.use(apiLimiter);

app.use("/", routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
