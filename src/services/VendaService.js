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

    static async update(req) {
        const { id } = req.params;
        const venda = await Venda.findByPk(id, { include: { all: true, nested: true } });
        return await venda.update(req.body);
    }

    static async destroy(req) {
        const { id } = req.params;
        const venda = await Venda.findByPk(id, { include: { all: true, nested: true } });
        return await venda.destroy();
    }
}

export { VendaService };
