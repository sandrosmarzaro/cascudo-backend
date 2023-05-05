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

    static async updateParcial(req) {
        const { id } = req.params;
        const itemvenda = await ItemVenda.findByPk(id, { include: { all: true, nested: true } });
        if (!itemvenda) {
            throw "ItemVenda não encontrado";
        }
        return await itemvenda.update(req.body);
    }

    static async updateTotal(req) {
        const { id } = req.params;
        const  { quantidade, valorCerveja, valorCasco, vendaId, cervejaId } = req.body;
        const itemvenda = await ItemVenda.findByPk(id, { include: { all: true, nested: true } });
        if (!itemvenda) {
            throw "ItemVenda não encontrado";
        }
        Object.assign(itemvenda, { quantidade, valorCerveja, valorCasco, vendaId, cervejaId });
        return await itemvenda.save();
    }

    static async destroy(req) {
        const { id } = req.params;
        const itemvenda = await ItemVenda.findByPk(id, { include: { all: true, nested: true } });
        if (!itemvenda) {
            throw "ItemVenda não encontrado";
        }
        try {
            return await itemvenda.destroy();
        }
        catch (err) {
            throw "Não foi possível deletar o itemvenda";
        }
    }
}

export { ItemVendaService };
