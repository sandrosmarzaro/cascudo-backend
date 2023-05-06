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
        await itemEntrada.update(req.body);
        return await ItemEntrada.findByPk(id, { include: { all: true, nested: true } });
    }

    static async updateTotal(req) {
        const { id } = req.params;
        const {
            quantidade,
            valorCerveja,
            valorCasco,
            cervejaId,
            entradaId
        } = req.body;
        const itemEntrada = await ItemEntrada.findByPk(id, { include: { all: true, nested: true } });
        if (!itemEntrada) {
            throw "Entrada não encontrada";
        }
        Object.assign(itemEntrada, {
            quantidade,
            valorCerveja,
            valorCasco,
            cervejaId,
            entradaId
        });
        await itemEntrada.save(req.body);
        return await ItemEntrada.findByPk(id, { include: { all: true, nested: true } });
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
