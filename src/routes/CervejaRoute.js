import express from "express";

import { CervejaController } from "../controllers/CervejaController.js";

const routes = express.Router();

routes.get(CervejaController.index);
routes.get(`/:id`, CervejaController.show);
routes.post(CervejaController.store);
routes.patch(`/:id`, CervejaController.update);
routes.put(`/:id`, CervejaController.updateAll);
routes.delete(`/:id`, CervejaController.destroy);

export default routes;
