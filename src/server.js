import express from "express";
import routes from "./routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Cabeçalhos adicionados antes que as rotas sejam definidas
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());
app.use("/api/v1", routes);
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
