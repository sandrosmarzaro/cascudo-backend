import { Cliente } from "../models/Cliente.js";

class ClienteService {
    static async index() {
        return await Cliente.findAll({ include: { all: true, nested: true } });
    }

    static async show(req) {
        const { id } = req.params;
        return await Cliente.findByPk(id, { include: { all: true, nested: true } });
    }

    static async store(req) {
        const { nome, cpf, dataNascimento, email, foto } = req.body;
        return await Cliente.create({ nome, cpf, dataNascimento, email, foto });
    }

    static async updateParcial(req) {
        const { id } = req.params;
        const cliente = await Cliente.findByPk(id, { include: { all: true, nested: true } });
        if (!cliente) {
            throw "Cliente não encontrado";
        }
        return await cliente.update(req.body);
    }

    static async updateTotal(req) {
        const { id } = req.params;
        const cliente = await Cliente.findByPk(id, { include: { all: true, nested: true } });
        if (!cliente) {
            throw "Cliente não encontrado";
        }
        return await cliente.save(req.body);
    }

    static async destroy(req) {
        const { id } = req.params;
        const cliente = await Cliente.findByPk(id, { include: { all: true, nested: true } });
        if (!cliente) {
            throw "Cliente não encontrado";
        }
        try {
            return await cliente.destroy();
        }
        catch (err) {
            throw "Não foi possível deletar o cliente";
        }
    }
}

export { ClienteService };
