import { ItemEntrada } from "../models/ItemEntrada.js";

class ItemEntradaService {
    static async index() {
        return await ItemEntrada.findAll({ include: { all: true, nested: true } });
    }

    static async show(req) {
        const { id } = req.params;
        return await ItemEntrada.findByPk(id, { include: { all: true, nested: true } });
    }

    static async store(req) {
        const { quantidade, valorCerveja, valorCasco, entradaId, cervejaId } = req.body;
        return await ItemEntrada.create({ quantidade, valorCerveja, valorCasco, entradaId, cervejaId });
    }

    static async updateParcial(req) {
        const { id } = req.params;
        const itemEntrada = await ItemEntrada.findByPk(id, { include: { all: true, nested: true } });
        if (!itemEntrada) {
            throw "Item de entrada não encontrado";
        }
        return await itemEntrada.update(req.body);
    }

    static async updateTotal(req) {
        const { id } = req.params;
        const itemEntrada = await ItemEntrada.findByPk(id, { include: { all: true, nested: true } });
        if (!itemEntrada) {
            throw "Item de entrada não encontrado";
        }
        return await itemEntrada.save(req.body);
    }

    static async destroy(req) {
        const { id } = req.params;
        const itemEntrada = await ItemEntrada.findByPk(id, { include: { all: true, nested: true } });
        if (!itemEntrada) {
            throw "Item de entrada não encontrado";
        }
        try {
            return await itemEntrada.destroy();
        }
        catch (err) {
            throw "Não foi possível deletar o item de entrada";
        }
    }
}

export { ItemEntradaService };
