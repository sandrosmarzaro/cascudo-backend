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
        await cliente.update(req.body);
        return await Cliente.findByPk(id, { include: { all: true, nested: true } });
    }

    static async updateTotal(req, transaction) {
        const { id } = req.params;
        const {
            nome,
            cpf,
            dataNascimento,
            email,
            qtdCascosDevolvidos,
            foto
        } = req.body;
        const cliente = await Cliente.findByPk(id, { transaction });
        if (!cliente) {
            throw "Cliente não encontrado";
        }
        Object.assign(cliente, {
            nome,
            cpf,
            dataNascimento,
            email,
            qtdCascosDevolvidos,
            foto
        });
        await cliente.save({ transaction });
        return await Cliente.findByPk(id, { include: { all: true, nested: true }, transaction });
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
