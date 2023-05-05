import { Venda } from '../models/Venda.js';

class VendaService {
    static async index() {
        return await Venda.findAll({ include: { all: true, nested: true } });
    }

    static async show(req) {
        const { id } = req.params;
        return await Venda.findByPk(id, { include: { all: true, nested: true } });
    }

    static async store(req) {
        const {
            dataHora,
            totalSemCasco,
            totalComCasco,
            clienteId,
            funcionarioId,
        } = req.body;
        return await Venda.create({
            dataHora,
            totalSemCasco,
            totalComCasco,
            clienteId,
            funcionarioId,
        });
    }

    static async updateParcial(req) {
        const { id } = req.params;
        const venda = await Venda.findByPk(id, { include: { all: true, nested: true } });
        if (!venda) {
            throw "Venda não encontrada";
        }
        await venda.update(req.body);
        return await Venda.findByPk(id, { include: { all: true, nested: true } });
    }

    static async updateTotal(req) {
        const { id } = req.params;
        const { dataHora, totalSemCasco, totalComCasco, clienteId, funcionarioId } = req.body;
        const venda = await Venda.findByPk(id, { include: { all: true, nested: true } });
        if (!venda) {
            throw "Venda não encontrada";
        }
        Object.assign(venda, { dataHora, totalSemCasco, totalComCasco, clienteId, funcionarioId });
        await venda.save();
        return await Venda.findByPk(id, { include: { all: true, nested: true } });
    }

    static async destroy(req) {
        const { id } = req.params;
        const venda = await Venda.findByPk(id, { include: { all: true, nested: true } });
        if (!venda) {
            throw "Venda não encontrada";
        }
        try {
            return await venda.destroy();
        }
        catch (err) {
            throw "Não foi possível deletar a venda";
        }
    }
}

export { VendaService };
