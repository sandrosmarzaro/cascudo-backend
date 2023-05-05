import { FuncionarioService } from "../services/FuncionarioService.js";

class FuncionarioController {
    static async index(req, res, next) {
        FuncionarioService.index()
            .then((funcionarios) => res.json(funcionarios))
            .catch(next);
    }

    static async show(req, res, next) {
        FuncionarioService.show(req)
            .then((funcionario) => res.json(funcionario))
            .catch(next);
    }

    static async store(req, res, next) {
        FuncionarioService.store(req)
            .then((funcionario) => res.json(funcionario))
            .catch(next);
    }

    static async updateParcial(req, res, next) {
        FuncionarioService.updateParcial(req)
            .then((funcionario) => res.json(funcionario))
            .catch(next);
    }

    static async updateTotal(req, res, next) {
        FuncionarioService.updateTotal(req)
            .then((funcionario) => res.json(funcionario))
            .catch(next);
    }

    static async destroy(req, res, next) {
        FuncionarioService.destroy(req)
            .then((funcionario) => res.json(funcionario))
            .catch(next);
    }
}

export { FuncionarioController };
