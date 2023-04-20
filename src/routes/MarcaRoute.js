import express from "express";

import { MarcaController } from "../controllers/MarcaController.js";

const routes = express.Router();

routes.get(MarcaController.index);
routes.get(`/:id`, MarcaController.show);
routes.post(MarcaController.store);
routes.patch(`/:id`, MarcaController.update);
routes.put(`/:id`, MarcaController.updateAll);
routes.delete(`/:id`, MarcaController.destroy);

export default routes;
