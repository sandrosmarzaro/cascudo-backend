import { Router } from "express";

import { VendaRoute } from "./routes/VendaRoute.js";
import { ItemVendaRoute } from "./routes/ItemVendaRoute.js";
import { DevolucaoRoute } from "./routes/DevolucaoRoute.js";
import { CervejaRoute } from "./routes/CervejaRoute.js";
import { MarcaRoute } from "./routes/MarcaRoute.js";
import { FornecedorRoute } from "./routes/FornecedorRoute.js";

const routes = Router();

routes.use("/vendas", VendaRoute);
routes.use("/itemvendas", ItemVendaRoute);
routes.use("/devolucoes", DevolucaoRoute);
routes.use("/cervejas", CervejaRoute);
routes.use("/marcas", MarcaRoute);
routes.use("/fornecedores", FornecedorRoute);

export default routes;
