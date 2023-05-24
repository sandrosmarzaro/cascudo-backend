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
            let moddifedCervejas = [];
            let clientModdifed = []
            await this.checkBussinessRules(
                venda,
                itensVenda,
                devolucoes,
                moddifedCervejas,
                clienteId,
                clientModdifed,
                transaction
            );
            await transaction.commit();
            return await Venda.findByPk(venda.id, { include: { all: true, nested: true } });
        }
        catch (err) {
            await transaction.rollback();
            console.error(err);
            throw `Não foi possível criar a venda: ${err}`
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

    static async checkBussinessRules(
        venda,
        itensVenda,
        devolucoes,
        moddifedCervejas,
        clienteId,
        clientModdifed,
        transaction
    ) {
        await this.checkEmpityStockAvailableBussinessRule(
            itensVenda,
            moddifedCervejas,
            devolucoes,
            clienteId,
            clientModdifed,
            transaction
        );
        await this.checkDiscountBussinessRule(venda, clientModdifed, transaction);
    }

    static async checkEmpityStockAvailableBussinessRule(
        itensVenda,
        moddifedCervejas,
        devolucoes,
        clienteId,
        clientModdifed,
        transaction
    ) {
        await this.applyChangesOnCervejasStock(itensVenda, moddifedCervejas, transaction);
        await this.verifyEmpityStockAvailable(devolucoes, moddifedCervejas);
        await this.applyChangesOnCascosStock(clienteId, moddifedCervejas, clientModdifed, devolucoes, transaction);
    }

    static async applyChangesOnCervejasStock(itensVenda, moddifedCervejas,transaction) {
        await Promise.all(itensVenda.map(async (itemVenda) => {
            const cerveja = await CervejaService.show({ params: { id: itemVenda.cervejaId } });
            cerveja.qtdCheio -= itemVenda.quantidade;
            moddifedCervejas.push(cerveja);
            await CervejaService.updateTotal(
                {
                    params: { id: cerveja.id },
                    body: cerveja
                },
                transaction
            );
        }));
    }

    static async verifyEmpityStockAvailable(devolucoes, moddifedCervejas) {
        for (const devolucao of devolucoes) {
            const cerveja = moddifedCervejas.find(cerveja => cerveja.id === devolucao.cervejaId);
            const qtdTotalCascos = cerveja.qtdCheio + cerveja.qtdVazio;
            const qtdAvailableCascos = cerveja.qtdMaxEstoque - qtdTotalCascos;
            if (devolucao.quantidade > qtdAvailableCascos) {
                throw "Não há espaço nas grades disponível";
            }
        }
    }

    static async applyChangesOnCascosStock(clienteId, moddifedCervejas, clientModdifed, devolucoes, transaction) {
        const cliente = await ClienteService.show({ params: { id: clienteId } });
        await Promise.all(devolucoes.map(async (devolucao) => {
            const cerveja = moddifedCervejas.find(cerveja => cerveja.id === devolucao.cervejaId);
            cerveja.qtdVazio += devolucao.quantidade;
            await CervejaService.updateTotal(
                {
                    params: { id: cerveja.id },
                    body: cerveja
                },
                transaction
            );
            cliente.qtdCascosDevolvidos += devolucao.quantidade;
            clientModdifed.push(cliente);
            await ClienteService.updateTotal(
                {
                    params: { id: cliente.id },
                    body: cliente
                },
                transaction
            );
        }));
    }

    static async checkDiscountBussinessRule(venda, clientModdifed, transaction) {
        if (await this.isDevolutionDiscountAvailable(clientModdifed)) {
            await this.applyDiscountInThisPurchase(venda, clientModdifed, transaction);
        }
    }

    static async isDevolutionDiscountAvailable(clientModdifed) {
        const twoBoxesQtd = 24;
        return clientModdifed[0].qtdCascosDevolvidos >= twoBoxesQtd;
    }

    static async applyDiscountInThisPurchase(venda, clientModdifed, transaction) {
        const cliente = clientModdifed[0];
        const discountPercentage = 0.05;
        const twoBoxesQtd = 24;
        const discountValueSemCasco = venda.totalSemCasco * discountPercentage;
        venda.totalSemCasco -= discountValueSemCasco;
        const discountValueComCasco = venda.totalComCasco * discountPercentage;
        venda.totalComCasco -= discountValueComCasco;
        cliente.qtdCascosDevolvidos -= twoBoxesQtd;
        venda.totalSemCasco = Number(venda.totalSemCasco.toFixed(2));
        venda.totalComCasco = Number(venda.totalComCasco.toFixed(2));
        await ClienteService.updateTotal(
            {
                params: { id: cliente.id },
                body: cliente
            },
            transaction
        );
        await venda.save({ transaction: transaction });
    }
}

export { VendaService };
