const express = require("express");
const config = require("./config");
const loaders = require("./loaders");
const auth = require("./middleware/authentication");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

const { UserRoutes, PhoneRoutes } = require("./routes");
const app = express();

config();
loaders();

app.use(express.json());

app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/phones", auth, PhoneRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(process.env.APP_PORT, () => {
  console.log(`Application is running on port: ${process.env.APP_PORT}`);
});
