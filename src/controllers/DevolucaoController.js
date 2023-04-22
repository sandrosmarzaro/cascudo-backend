import { DevolucaoService } from '../services/DevolucaoService.js';

class DevolucaoController {
    static async index(req, res, next) {
        DevolucaoService.index()
            .then((devolucoes) => res.json(devolucoes))
            .catch(next);
    }

    static async show(req, res, next) {
        DevolucaoService.show(req)
            .then((devolucao) => res.json(devolucao))
            .catch(next);
    }

    static async store(req, res, next) {
        DevolucaoService.store(req)
            .then((devolucao) => res.json(devolucao))
            .catch(next);
    }

    static async update(req, res, next) {
        DevolucaoService.update(req)
            .then((devolucao) => res.json(devolucao))
            .catch(next);
    }

    static async destroy(req, res, next) {
        DevolucaoService.destroy(req)
            .then((devolucao) => res.json(devolucao))
            .catch(next);
    }
}

export { DevolucaoController };
