import express from "express";

import { ItemVendaController } from "../controllers/ItemVendaController.js";

const routes = express.Router();

routes.get(ItemVendaController.index);
routes.get(`/:id`, ItemVendaController.show);
routes.post(ItemVendaController.store);
routes.patch(`/:id`, ItemVendaController.update);
routes.put(`/:id`, ItemVendaController.updateAll);
routes.delete(`/:id`, ItemVendaController.destroy);

export default routes;

