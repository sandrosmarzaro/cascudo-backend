import { EntradaService } from "../services/EntradaService.js";

class EntradaController {
    static async index(req, res, next) {
        EntradaService.index()
            .then((entradas) => res.json(entradas))
            .catch(next);
    }

    static async show(req, res, next) {
        EntradaService.show(req)
            .then((entrada) => res.json(entrada))
            .catch(next);
    }

    static async store(req, res, next) {
        EntradaService.store(req)
            .then((entrada) => res.json(entrada))
            .catch(next);
    }

    static async updateParcial(req, res, next) {
        EntradaService.updateParcial(req)
            .then((entrada) => res.json(entrada))
            .catch(next);
    }

    static async updateTotal(req, res, next) {
        EntradaService.updateTotal(req)
            .then((entrada) => res.json(entrada))
            .catch(next);
    }

    static async destroy(req, res, next) {
        EntradaService.destroy(req)
            .then((entrada) => res.json(entrada))
            .catch(next);
    }
}

export { EntradaController };
