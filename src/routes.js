import { Router } from "express";

import { VendaController } from "./controllers/VendaController.js";
import { ItemVendaController } from "../controllers/ItemVendaController.js";
import { DevolucaoController } from "../controllers/DevolucaoController.js";
import { CervejaController } from "../controllers/CervejaController.js";
import { MarcaController } from "../controllers/MarcaController.js";
import { FornecedorController } from "./controllers/FornecedorController.js";

const routes = Router();

let uri = "/vendas";
routes.get(uri, VendaController.index);
routes.get(`${uri}/:id`, VendaController.show);
routes.post(uri, VendaController.store);
routes.patch(`${uri}/:id`, VendaController.update);
routes.put(`${uri}/:id`, VendaController.updateAll);
routes.delete(`${uri}/:id`, VendaController.destroy);

uri = "/itemvendas";
routes.get(uri, ItemVendaController.index);
routes.get(`${uri}/:id`, ItemVendaController.show);
routes.post(uri, ItemVendaController.store);
routes.patch(`${uri}/:id`, ItemVendaController.update);
routes.put(`${uri}/:id`, ItemVendaController.updateAll);
routes.delete(`${uri}/:id`, ItemVendaController.destroy);

uri = "/devolucoes";
routes.get(uri, DevolucaoController.index);
routes.get(`${uri}/:id`, DevolucaoController.show);
routes.post(uri, DevolucaoController.store);
routes.patch(`${uri}/:id`, DevolucaoController.update);
routes.put(`${uri}/:id`, DevolucaoController.updateAll);
routes.delete(`${uri}/:id`, DevolucaoController.destroy);

uri = "/cervejas";
routes.get(uri, CervejaController.index);
routes.get(`${uri}/:id`, CervejaController.show);
routes.post(uri, CervejaController.store);
routes.patch(`${uri}/:id`, CervejaController.update);
routes.put(`${uri}/:id`, CervejaController.updateAll);
routes.delete(`${uri}/:id`, CervejaController.destroy);

uri = "/marcas";
routes.get(uri, MarcaController.index);
routes.get(`${uri}/:id`, MarcaController.show);
routes.post(uri, MarcaController.store);
routes.patch(`${uri}/:id`, MarcaController.update);
routes.put(`${uri}/:id`, MarcaController.updateAll);
routes.delete(`${uri}/:id`, MarcaController.destroy);

uri = "/fornecedores";
routes.get(uri, FornecedorController.index);
routes.get(`${uri}/:id`, FornecedorController.show);
routes.post(uri, FornecedorController.store);
routes.patch(`${uri}/:id`, FornecedorController.update);
routes.put(`${uri}/:id`, FornecedorController.updateAll);
routes.delete(`${uri}/:id`, FornecedorController.destroy);

export default routes;
