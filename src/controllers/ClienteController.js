import { ClienteService } from "../services/ClienteService.js";

class ClienteController {
    static async index(req, res, next) {
        ClienteService.index()
            .then((clientes) => res.json(clientes))
            .catch(next);
    }

    static async show(req, res, next) {
        ClienteService.show(req)
            .then((cliente) => res.json(cliente))
            .catch(next);
    }

    static async store(req, res, next) {
        ClienteService.store(req)
            .then((cliente) => res.json(cliente))
            .catch(next);
    }

    static async updateParcial(req, res, next) {
        ClienteService.updateParcial(req)
            .then((cliente) => res.json(cliente))
            .catch(next);
    }

    static async updateTotal(req, res, next) {
        ClienteService.updateTotal(req)
            .then((cliente) => res.json(cliente))
            .catch(next);
    }

    static async destroy(req, res, next) {
        ClienteService.destroy(req)
            .then((cliente) => res.json(cliente))
            .catch(next);
    }
}

export { ClienteController };
