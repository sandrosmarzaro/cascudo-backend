import express from "express";

import { VendaController } from "./controllers/VendaController.js";

const routes = express.Router();

routes.get(VendaController.index);
routes.get(`/:id`, VendaController.show);
routes.post(VendaController.store);
routes.patch(`/:id`, VendaController.update);
routes.put(`/:id`, VendaController.updateAll);
routes.delete(`/:id`, VendaController.destroy);

export default routes;
