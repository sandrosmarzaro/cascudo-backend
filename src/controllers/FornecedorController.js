import { FornecedorService } from "../services/FornecedorService.js";

class FornecedorController {
    static async index(req, res, next) {
        FornecedorService.index()
            .then((fornecedores) => res.json(fornecedores))
            .catch(next);
    }

    static async show(req, res, next) {
        FornecedorService.show(req)
            .then((fornecedor) => res.json(fornecedor))
            .catch(next);
    }

    static async store(req, res, next) {
        FornecedorService.store(req)
            .then((fornecedor) => res.json(fornecedor))
            .catch(next);
    }

    static async update(req, res, next) {
        FornecedorService.update(req)
            .then((fornecedor) => res.json(fornecedor))
            .catch(next);
    }

    static async destroy(req, res, next) {
        FornecedorService.destroy(req)
            .then((fornecedor) => res.json(fornecedor))
            .catch(next);
    }
}

export { FornecedorController };
