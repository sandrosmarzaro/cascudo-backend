import { MarcaService } from '../services/MarcaService.js';

class MarcaController {
    static async index(req, res, next) {
        MarcaService.index()
            .then((marcas) => res.json(marcas))
            .catch(next);
    }

    static async show(req, res, next) {
        MarcaService.show(req)
            .then((marca) => res.json(marca))
            .catch(next);
    }

    static async store(req, res, next) {
        MarcaService.store(req)
            .then((marca) => res.json(marca))
            .catch(next);
    }

    static async updateParcial(req, res, next) {
        MarcaService.updateParcial(req)
            .then((marca) => res.json(marca))
            .catch(next);
    }

    static async updateTotal(req, res, next) {
        MarcaService.updateTotal(req)
            .then((marca) => res.json(marca))
            .catch(next);
    }

    static async destroy(req, res, next) {
        MarcaService.destroy(req)
            .then((marca) => res.json(marca))
            .catch(next);
    }
}

export { MarcaController };
