import express from "express";

import { DevolucaoController } from "../controllers/DevolucaoController.js";

const routes = express.Router();

routes.get(DevolucaoController.index);
routes.get(`/:id`, DevolucaoController.show);
routes.post(DevolucaoController.store);
routes.patch(`/:id`, DevolucaoController.update);
routes.put(`/:id`, DevolucaoController.updateAll);
routes.delete(`/:id`, DevolucaoController.destroy);

export default routes;
