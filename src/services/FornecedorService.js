import { Fornecedor } from '../models/Fornecedor.js';

class FornecedorService {
    static async index() {
        return await Fornecedor.findAll({ include: { all: true, nested: true } });
    }

    static async show(req) {
        const { id } = req.params;
        return await Fornecedor.findByPk(id, { include: { all: true, nested: true } });
    }

    static async store(req) {
        const { nome, logo, endereco, horaEntrega, diaEntrega } = req.body;
        return await Fornecedor.create({ nome, logo, endereco, horaEntrega, diaEntrega });
    }

    static async update(req) {
        const { id } = req.params;
        const fornecedor = await Fornecedor.findByPk(id, { include: { all: true, nested: true } });
        if (!fornecedor) {
            throw "Fornecedor não encontrado";
        }
        return await fornecedor.update(req.body);
    }

    static async destroy(req) {
        const { id } = req.params;
        const fornecedor = await Fornecedor.findByPk(id, { include: { all: true, nested: true } });
        if (!fornecedor) {
            throw "Fornecedor não encontrado";
        }
        try {
            return await fornecedor.destroy();
        }
        catch (err) {
            throw "Não foi possível deletar o fornecedor";
        }
    }
}

export { FornecedorService };
