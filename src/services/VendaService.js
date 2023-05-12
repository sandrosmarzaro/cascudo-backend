import { Venda } from '../models/Venda.js';
import { CervejaService } from "./CervejaService";
import { ClienteService } from "./ClienteService";

import sequelize from '../config/database-connection.js';

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

    static async applyBussinessRules(req) {
        const {
            dataHora,
            totalSemCasco,
            totalComCasco,
            clienteId,
            funcionarioId,
        } = req.body;

        if (await isEmpityStockAvailable()) {
            await tryApplyDevolutionDiscount(clienteId);
        }
        else {
            throw "Não há espaço nas grades disponível";
        }
    }

    static async isEmpityStockAvailable() {
        const devolutions = await sequelize.query(
            "SELECT * FROM devolucoes WHERE vendaId = :vendaId",
            { replacements: { vendaId: this.id }, type: sequelize.QueryTypes.SELECT }
        );
        for (const devolution of devolutions) {
            const cerveja = await CervejaService.show(devolution.cervejaId);
            if (!cerveja) {
                throw "Cerveja não encontrada";
            }
            const qtdTotalCascos = cerveja.qtdCheio + cerveja.qtdVazio;
            const qtdAvailableCascos = cerveja.qtdMaxEstoque - qtdTotalCascos;
            if (devolution.quantidade > qtdAvailableCascos) {
                throw "Não há espaço nas grades disponível";
            }
        }
    }

    static async tryApplyDevolutionDiscount(clienteId) {
        const cliente = await ClienteService.show(clienteId, { include: { all: true, nested: true } });
        if (!cliente) {
            throw "Cliente não encontrado";
        }
        const twoBoxesQtd = 24;
        if (cliente.qtdCascosDevolvidos >= twoBoxesQtd) {
            const discountPercentage = 0.05;
            const discountValueSemCasco = this.totalSemCasco * discountPercentage;
            this.totalSemCasco -= discountValueSemCasco;
            const discountValueComCasco = this.totalComCasco * discountPercentage;
            this.totalComCasco -= discountValueComCasco;
            cliente.qtdCascosDevolvidos -= twoBoxesQtd;
            await ClienteService.updateParcial(clienteId, { qtdCascosDevolvidos: cliente.qtdCascosDevolvidos });
        }
    }
}

export { VendaService };
