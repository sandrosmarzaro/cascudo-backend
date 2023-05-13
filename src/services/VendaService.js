import { Venda } from '../models/Venda.js';
import { CervejaService } from "./CervejaService.js";
import { ClienteService } from "./ClienteService.js";

import sequelize from '../config/connection.js';

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
            itensVenda,
            devolucoes
        } = req.body;
        const transaction = await sequelize.transaction();
        try {
            const venda = await Venda.create({
                dataHora,
                totalSemCasco,
                totalComCasco,
                clienteId,
                funcionarioId,
            }, { transaction: transaction });
            await Promise.all(itensVenda.map(async (itemVenda) => {
                return await venda.createItemVenda({
                    quantidade: itemVenda.quantidade,
                    valorCerveja: itemVenda.valorCerveja,
                    valorCasco: itemVenda.valorCasco,
                    cervejaId: itemVenda.cervejaId,
                    vendaId: venda.id
                }, { transaction: transaction });
            }));
            await Promise.all(devolucoes.map(async (devolucao) => {
                return await venda.createDevolucao({
                    quantidade: devolucao.quantidade,
                    valorCasco: devolucao.valorCasco,
                    cervejaId: devolucao.cervejaId,
                    vendaId: venda.id
                }, { transaction: transaction });
            }));
            await transaction.commit();
            return await Venda.findByPk(venda.id, { include: { all: true, nested: true } });
        }
        catch (err) {
            await transaction.rollback();
            throw "Não foi possível criar a venda";
        }
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
        const { dataHora, totalSemCasco, totalComCasco, clienteId, funcionarioId, itensVenda, devolucoes } = req.body;
        const venda = await Venda.findByPk(id, { include: { all: true, nested: true } });
        if (!venda) {
            throw "Venda não encontrada";
        }
        const transaction = await sequelize.transaction();
        Object.assign(venda, { dataHora, totalSemCasco, totalComCasco, clienteId, funcionarioId });
        await venda.save({ transaction: transaction });
        try{
            await Promise.all((await venda.itensVenda).map(
                itemVenda => itemVenda.destroy({ transaction: transaction })
            ));
            await Promise.all((await venda.devolucoes).map(
                devolucao => devolucao.destroy({ transaction: transaction })
            ));
            await Promise.all(itensVenda.map(itemVenda => {
                return venda.createItemVenda({
                    quantidade: itemVenda.quantidade,
                    valorCerveja: itemVenda.valorCerveja,
                    valorCasco: itemVenda.valorCasco,
                    cervejaId: itemVenda.cervejaId,
                    vendaId: venda.id
                }, { transaction: transaction });
            }));
            await Promise.all(devolucoes.map(devolucao => {
                return venda.createDevolucao({
                    quantidade: devolucao.quantidade,
                    valorCasco: devolucao.valorCasco,
                    vendaId: venda.id,
                    cervejaId: devolucao.cervejaId
                }, { transaction: transaction });
            }));
            await transaction.commit();
            return await Venda.findByPk(id, { include: { all: true, nested: true } });
        }
        catch (err) {
            await transaction.rollback();
            throw "Não foi possível atualizar a venda";
        }
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
