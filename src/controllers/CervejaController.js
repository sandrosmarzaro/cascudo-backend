import { CervejaService } from "../services/CervejaService.js";

class CervejaController {
    static async index(req, res, next) {
        CervejaService.index()
            .then((cervejas) => res.json(cervejas))
            .catch(next);
    }

    static async show(req, res, next) {
        CervejaService.show(req)
            .then((cerveja) => res.json(cerveja))
            .catch(next);
    }

    static async store(req, res, next) {
        CervejaService.store(req)
            .then((cerveja) => res.json(cerveja))
            .catch(next);
    }

    static async updateParcial(req, res, next) {
        CervejaService.updateParcial(req)
            .then((cerveja) => res.json(cerveja))
            .catch(next);
    }

    static async updateTotal(req, res, next) {
        CervejaService.updateTotal(req)
            .then((cerveja) => res.json(cerveja))
            .catch(next);
    }

    static async destroy(req, res, next) {
        CervejaService.destroy(req)
            .then((cerveja) => res.json(cerveja))
            .catch(next);
    }

    static async findAmountOfBeersSoldByDate(req, res, next) {
        CervejaService.findAmountOfBeersSoldByDate(req)
            .then((cerveja) => res.json(cerveja))
            .catch(next);
    }
}

export { CervejaController };
