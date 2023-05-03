import { Router } from "express";

import { VendaController } from "./controllers/VendaController.js";
import { ItemVendaController } from "./controllers/ItemVendaController.js";
import { DevolucaoController } from "./controllers/DevolucaoController.js";
import { CervejaController } from "./controllers/CervejaController.js";
import { MarcaController } from "./controllers/MarcaController.js";
import { FornecedorController } from "./controllers/FornecedorController.js";

const routes = Router();

let uri = "/vendas";
routes.get(uri, VendaController.index);
routes.get(`${uri}/:id`, VendaController.show);
routes.post(uri, VendaController.store);
routes.put(`${uri}/:id`, VendaController.updateTotal);
routes.patch(`${uri}/:id`, VendaController.updateParcial);
routes.delete(`${uri}/:id`, VendaController.destroy);

uri = "/itemvendas";
routes.get(uri, ItemVendaController.index);
routes.get(`${uri}/:id`, ItemVendaController.show);
routes.post(uri, ItemVendaController.store);
routes.put(`${uri}/:id`, ItemVendaController.updateTotal);
routes.patch(`${uri}/:id`, ItemVendaController.updateParcial);
routes.delete(`${uri}/:id`, ItemVendaController.destroy);

uri = "/devolucoes";
routes.get(uri, DevolucaoController.index);
routes.get(`${uri}/:id`, DevolucaoController.show);
routes.post(uri, DevolucaoController.store);
routes.put(`${uri}/:id`, DevolucaoController.updateTotal);
routes.patch(`${uri}/:id`, DevolucaoController.updateParcial);
routes.delete(`${uri}/:id`, DevolucaoController.destroy);

uri = "/cervejas";
routes.get(uri, CervejaController.index);
routes.get(`${uri}/:id`, CervejaController.show);
routes.post(uri, CervejaController.store);
routes.put(`${uri}/:id`, CervejaController.updateTotal);
routes.patch(`${uri}/:id`, CervejaController.updateParcial);
routes.delete(`${uri}/:id`, CervejaController.destroy);

uri = "/marcas";
routes.get(uri, MarcaController.index);
routes.get(`${uri}/:id`, MarcaController.show);
routes.post(uri, MarcaController.store);
routes.put(`${uri}/:id`, MarcaController.updateTotal);
routes.patch(`${uri}/:id`, MarcaController.updateParcial);
routes.delete(`${uri}/:id`, MarcaController.destroy);

uri = "/fornecedores";
routes.get(uri, FornecedorController.index);
routes.get(`${uri}/:id`, FornecedorController.show);
routes.post(uri, FornecedorController.store);
routes.put(`${uri}/:id`, FornecedorController.updateTotal);
routes.patch(`${uri}/:id`, FornecedorController.updateParcial);
routes.delete(`${uri}/:id`, FornecedorController.destroy);

export default routes;
