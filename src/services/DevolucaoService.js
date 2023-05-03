import { Devolucao } from '../models/Devolucao.js';

class DevolucaoService {
    static async index() {
        return await Devolucao.findAll({ include: { all: true, nested: true } });
    }

    static async show(req) {
        const { id } = req.params;
        return await Devolucao.findByPk(id, { include: { all: true, nested: true } });
    }

    static async store(req) {
        const { quantidade, valorCasco, vendaId, cervejaId } = req.body;
        return await Devolucao.create({ quantidade, valorCasco, vendaId, cervejaId });
    }

    static async updateParcial(req) {
        const { id } = req.params;
        const devolucao = await Devolucao.findByPk(id, { include: { all: true, nested: true } });
        if (!devolucao) {
            throw "Devolucao não encontrada";
        }
        return await devolucao.update(req.body);
    }

    static async updateTotal(req) {
        const { id } = req.params;
        const devolucao = await Devolucao.findByPk(id, { include: { all: true, nested: true } });
        if (!devolucao) {
            throw "Devolucao não encontrada";
        }
        return await devolucao.save(req.body);
    }

    static async destroy(req) {
        const { id } = req.params;
        const devolucao = await Devolucao.findByPk(id, { include: { all: true, nested: true } });
        if (!devolucao) {
            throw "Devolucao não encontrada";
        }
        try {
            return await devolucao.destroy();
        }
        catch (err) {
            throw "Não foi possível deletar a devolucao";
        }
    }
}

export { DevolucaoService };
