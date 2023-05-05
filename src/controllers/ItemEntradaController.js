import { ItemEntradaService } from "../services/ItemEntradaService.js";

class ItemEntradaController {
    static async index(req, res, next) {
        ItemEntradaService.index()
            .then((itementradas) => res.json(itementradas))
            .catch(next);
    }

    static async show(req, res, next) {
        ItemEntradaService.show(req)
            .then((itementrada) => res.json(itementrada))
            .catch(next);
    }

    static async store(req, res, next) {
        ItemEntradaService.store(req)
            .then((itementrada) => res.json(itementrada))
            .catch(next);
    }

    static async updateParcial(req, res, next) {
        ItemEntradaService.updateParcial(req)
            .then((itementrada) => res.json(itementrada))
            .catch(next);
    }

    static async updateTotal(req, res, next) {
        ItemEntradaService.updateTotal(req)
            .then((itementrada) => res.json(itementrada))
            .catch(next);
    }

    static async destroy(req, res, next) {
        ItemEntradaService.destroy(req)
            .then((itementrada) => res.json(itementrada))
            .catch(next);
    }
}

export { ItemEntradaController };
