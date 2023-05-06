import { Funcionario } from "../models/Funcionario.js";

class FuncionarioService {
    static async index() {
        return await Funcionario.findAll({ include: { all: true, nested: true } });
    }

    static async show(req) {
        const { id } = req.params;
        return await Funcionario.findByPk(id, { include: { all: true, nested: true } });
    }

    static async store(req) {
        const { nome, codigo, dataNascimento, senha, foto, gerente } = req.body;
        return await Funcionario.create({ nome, codigo, dataNascimento, senha, foto, gerente });
    }

    static async updateParcial(req) {
        const { id } = req.params;
        const funcionario = await Funcionario.findByPk(id, { include: { all: true, nested: true } });
        if (!funcionario) {
            throw "Funcionário não encontrado";
        }
        await funcionario.update(req.body);
        return await Funcionario.findByPk(id, { include: { all: true, nested: true } });
    }

    static async updateTotal(req) {
        const { id } = req.params;
        const {
            nome,
            codigo,
            dataNascimento,
            senha,
            foto
        } = req.body;
        const funcionario = await Funcionario.findByPk(id, { include: { all: true, nested: true } });
        if (!funcionario) {
            throw "Funcionário não encontrado";
        }
        Object.assign(funcionario, {
            nome,
            codigo,
            dataNascimento,
            senha,
            foto
        });
        await funcionario.save(req.body);
        return await Funcionario.findByPk(id, { include: { all: true, nested: true } });
    }

    static async destroy(req) {
        const { id } = req.params;
        const funcionario = await Funcionario.findByPk(id, { include: { all: true, nested: true } });
        if (!funcionario) {
            throw "Funcionário não encontrado";
        }
        try {
            return await funcionario.destroy();
        }
        catch (err) {
            throw "Não foi possível deletar o funcionário";
        }
    }
}

export { FuncionarioService };
