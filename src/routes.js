import { Router } from "express";

import { VendaController } from "./controllers/VendaController.js";
import { ItemVendaController } from "./controllers/ItemVendaController.js";
import { DevolucaoController } from "./controllers/DevolucaoController.js";
import { EntradaController } from "./controllers/EntradaController.js";
import { ItemEntradaController } from "./controllers/ItemEntradaController.js";
import { CervejaController } from "./controllers/CervejaController.js";
import { MarcaController } from "./controllers/MarcaController.js";
import { FornecedorController } from "./controllers/FornecedorController.js";
import { FuncionarioController } from "./controllers/FuncionarioController.js";
import { ClienteController } from "./controllers/ClienteController.js";

const routes = Router();

let uri = "/vendas";
routes.get(uri, VendaController.index);
routes.get(`${uri}/:id`, VendaController.show);
routes.post(uri, VendaController.store);
routes.put(`${uri}/:id`, VendaController.updateTotal);
routes.patch(`${uri}/:id`, VendaController.updateParcial);
routes.delete(`${uri}/:id`, VendaController.destroy);
routes.get(`${uri}/findTotalBrandSalesByDate/:startDate/:endDate`, VendaController.findTotalBrandSalesByDate);

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

uri = "/entradas";
routes.get(uri, EntradaController.index);
routes.get(`${uri}/:id`, EntradaController.show);
routes.post(uri, EntradaController.store);
routes.put(`${uri}/:id`, EntradaController.updateTotal);
routes.patch(`${uri}/:id`, EntradaController.updateParcial);
routes.delete(`${uri}/:id`, EntradaController.destroy);

uri = "/itementradas";
routes.get(uri, ItemEntradaController.index);
routes.get(`${uri}/:id`, ItemEntradaController.show);
routes.post(uri, ItemEntradaController.store);
routes.put(`${uri}/:id`, ItemEntradaController.updateTotal);
routes.patch(`${uri}/:id`, ItemEntradaController.updateParcial);
routes.delete(`${uri}/:id`, ItemEntradaController.destroy);

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

uri = "/funcionarios";
routes.get(uri, FuncionarioController.index);
routes.get(`${uri}/:id`, FuncionarioController.show);
routes.post(uri, FuncionarioController.store);
routes.put(`${uri}/:id`, FuncionarioController.updateTotal);
routes.patch(`${uri}/:id`, FuncionarioController.updateParcial);
routes.delete(`${uri}/:id`, FuncionarioController.destroy);

uri = "/clientes";
routes.get(uri, ClienteController.index);
routes.get(`${uri}/:id`, ClienteController.show);
routes.post(uri, ClienteController.store);
routes.put(`${uri}/:id`, ClienteController.updateTotal);
routes.patch(`${uri}/:id`, ClienteController.updateParcial);
routes.delete(`${uri}/:id`, ClienteController.destroy);

export default routes;
