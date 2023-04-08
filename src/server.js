import express from "express";
import sequelize from "./config/connection.js";

const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
