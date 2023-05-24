import { Entrada } from "../models/Entrada.js";
import { ItemEntrada } from "../models/ItemEntrada.js";
import { Cerveja } from "../models/Cerveja.js";
import { Marca } from "../models/Marca.js";
import sequelize from "../config/connection.js";
import { INTEGER, QueryTypes } from 'sequelize';


class EntradaService {
    static async index() {
        return await Entrada.findAll({ include: { all: true, nested: true } });
    }

    static async show(req) {
        const { id } = req.params;
        return await Entrada.findByPk(id, { include: { all: true, nested: true } });
    }

    static async store(req) {
        const { dataHora, itensEntrada, funcionarioId } = req.body;

        if(await EntradaService.verificarViolacaoRegra1(itensEntrada)){
            throw "Regra de Negócio 1 violada!";
        }else if(await EntradaService.verificarViolacaoRegra2(itensEntrada)){
            throw "Regra de Negócio 2 violada!";
        }else{
            try {
                const t = await sequelize.transaction();
                const entrada = await Entrada.create({ dataHora, funcionarioId }, { transaction: t });

                for (const item of itensEntrada) {
                    await ItemEntrada.create({
                        quantidade: item.quantidade,
                        valorCerveja: item.valorCerveja,
                        valorCasco: item.valorCasco,
                        fornecedorSelecionado: item.fornecedorSelecionado,
                        entradaId: entrada.id,
                        cervejaId: item.cervejaId
                    }, { transaction: t });

                    const qtdCascosVazios = await EntradaService.findQtdVazia(item.cervejaId);
                    const newQtdVazio = qtdCascosVazios[0].qtd_vazio - item.quantidade;

                    const cerveja = await Cerveja.findByPk(item.cervejaId);
                    cerveja.qtdVazio = newQtdVazio;
                    cerveja.qtdCheio += parseInt(item.quantidade);
                    await cerveja.save({ transaction: t });
                }

                await t.commit();
                return await Entrada.findByPk(entrada.id, { include: { all: true, nested: true } });
            } catch (error) {
                await t.rollback();
                throw "Não foi possível criar os itens de entrada!";
            }
        }
    }
    
    static async updateParcial(req) {
        const { id } = req.params;
        const entrada = await Entrada.findByPk(id, { include: { all: true, nested: true } });
        if (!entrada) {
            throw "Entrada não encontrada";
        }
        await entrada.update(req.body);
        return await Entrada.findByPk(id, { include: { all: true, nested: true } });
    }

    static async updateTotal(req) {
        const { id } = req.params;
        const {
            dataHora,
            funcionarioId
        } = req.body;
        const entrada = await Entrada.findByPk(id, { include: { all: true, nested: true } });
        if (!entrada) {
            throw "Entrada não encontrada";
        }
        Object.assign(entrada, {
            dataHora,
            funcionarioId
        });
        await entrada.save(req.body);
        return await Entrada.findByPk(id, { include: { all: true, nested: true } });
    }

    static async destroy(req) {
        const { id } = req.params;
        const entrada = await Entrada.findByPk(id, { include: { all: true, nested: true } });
        if (!entrada) {
            throw "Entrada não encontrada";
        }
        try {
            return await entrada.destroy();
        }
        catch (err) {
            throw "Não foi possível deletar a entrada";
        }
    }

    static async verificarViolacaoRegra1(itensEntrada){
        for (const item of itensEntrada) {
            const cerveja = await Cerveja.findByPk(item.cervejaId);
            const marca = await Marca.findByPk(cerveja.marcaId);

            if (marca.fornecedorId !== parseInt(item.fornecedorSelecionado)) {
                return true;
            }
        }
    }

    static async verificarViolacaoRegra2(itensEntrada) {
        for (const item of itensEntrada) {
            const qtdCascosVazios = await EntradaService.findQtdVazia(item.cervejaId);
            if (qtdCascosVazios[0].qtd_vazio < item.quantidade) {
                return true;
            }
        }
    }

    static async findQtdVazia(cervejaId) {
        const obj = await sequelize.query("SELECT cervejas.qtd_vazio FROM cervejas INNER JOIN item_entrada ON cervejas.id = item_entrada.cerveja_id WHERE item_entrada.cerveja_id = :cervejaId", { type: QueryTypes.SELECT, replacements: { cervejaId } });
        return obj;
    }
}

export { EntradaService };
