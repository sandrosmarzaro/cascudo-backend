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

    static async update(req) {
        const { id } = req.params;
        const devolucao = await Devolucao.findByPk(id, { include: { all: true, nested: true } });
        return await devolucao.update(req.body);
    }

    static async destroy(req) {
        const { id } = req.params;
        const devolucao = await Devolucao.findByPk(id, { include: { all: true, nested: true } });
        return await devolucao.destroy();
    }
}

export { DevolucaoService };
