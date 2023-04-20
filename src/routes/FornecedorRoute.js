import express from "express";

import { FornecedorController } from "../controllers/FornecedorController.js";

const routes = express.Router();

routes.get(FornecedorController.index);
routes.get(`/:id`, FornecedorController.show);
routes.post(FornecedorController.store);
routes.patch(`/:id`, FornecedorController.update);
routes.put(`/:id`, FornecedorController.updateAll);
routes.delete(`/:id`, FornecedorController.destroy);

export default routes;
