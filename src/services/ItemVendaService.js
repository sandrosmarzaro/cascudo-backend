import { ItemVenda } from '../models/ItemVenda.js';

class ItemVendaService {
    static async index() {
        return await ItemVenda.findAll({ include: { all: true, nested: true } });
    }

    static async show(req) {
        const { id } = req.params;
        return await ItemVenda.findByPk(id, { include: { all: true, nested: true } });
    }

    static async store(req) {
        const { quantidade, valorCerveja, valorCasco, vendaId, cervejaId } = req.body;
        return await ItemVenda.create({ quantidade, valorCerveja, valorCasco, vendaId, cervejaId });
    }

    static async update(req) {
        const { id } = req.params;
        const itemvenda = await ItemVenda.findByPk(id, { include: { all: true, nested: true } });
        return await itemvenda.update(req.body);
    }

    static async destroy(req) {
        const { id } = req.params;
        const itemvenda = await ItemVenda.findByPk(id, { include: { all: true, nested: true } });
        return await itemvenda.destroy();
    }
}

export { ItemVendaService };
