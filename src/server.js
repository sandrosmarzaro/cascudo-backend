import express from "express";
import sequelize from "./config/connection.js";
import routes from "./routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use("/api/v1", routes);
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
