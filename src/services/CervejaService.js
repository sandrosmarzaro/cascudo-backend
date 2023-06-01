import { Cerveja } from '../models/Cerveja.js';

import sequelize from '../config/connection.js';
import { Sequelize } from 'sequelize';

class CervejaService {
    static async index() {
        return await Cerveja.findAll({ include: { all: true, nested: true } });
    }

    static async show(req, transaction) {
        const { id } = req.params;
        return await Cerveja.findByPk(id, { include: { all: true, nested: true } }, { transaction });
    }

    static async store(req) {
        const {
            qtdMaxEstoque,
            qtdVazio,
            qtdCheio,
            qtdAlcool,
            precoCerveja,
            precoCasco,
            litragem,
            nome,
            imagem,
            marcaId
        } = req.body;
        return await Cerveja.create({
            qtdMaxEstoque,
            qtdVazio,
            qtdCheio,
            qtdAlcool,
            precoCerveja,
            precoCasco,
            litragem,
            nome,
            imagem,
            marcaId
        });
    }

    static async updateParcial(req) {
        const { id } = req.params;
        const cerveja = await Cerveja.findByPk(id, { include: { all: true, nested: true } });
        if (!cerveja) {
            throw "Cerveja não encontrada";
        }
        await cerveja.update(req.body);
        return await Cerveja.findByPk(id, { include: { all: true, nested: true } });
    }

    static async updateTotal(req, transaction) {
        const { id } = req.params;
        const {
            qtdMaxEstoque,
            qtdVazio,
            qtdCheio,
            qtdAlcool,
            precoCerveja,
            precoCasco,
            litragem,
            nome,
            imagem,
            marcaId
        } = req.body;
        const cerveja = await Cerveja.findByPk(id, { transaction });
        if (!cerveja) {
            throw "Cerveja não encontrada";
        }
        Object.assign(cerveja, {
            qtdMaxEstoque,
            qtdVazio,
            qtdCheio,
            qtdAlcool,
            precoCerveja,
            precoCasco,
            litragem,
            nome,
            imagem,
            marcaId
        });
        await cerveja.save({ transaction });
        return await Cerveja.findByPk(id, { include: { all: true, nested: true }, transaction });
    }

    static async destroy(req) {
        const { id } = req.params;
        const cerveja = await Cerveja.findByPk(id, { include: { all: true, nested: true } });
        if (!cerveja) {
            throw "Cerveja não encontrada";
        }
        try {
            return await cerveja.destroy();
        }
        catch (err) {
            throw "Não foi possível deletar a cerveja";
        }
    }

    static async findAmountOfBeersSoldByDate(req) {
        const { startDate, endDate } = req.params;
        return await sequelize.query(
            `SELECT
            cervejas.imagem AS Casco,
            cervejas.nome AS Cerveja,
            fornecedores.nome AS Fornecedor,
            SUM(item_venda.quantidade) AS Qtd
            FROM cervejas
            INNER JOIN marcas ON cervejas.marca_id = marcas.id
            INNER JOIN fornecedores ON marcas.id = fornecedores.id
            INNER JOIN item_venda ON cervejas.id = item_venda.cerveja_id
            INNER JOIN vendas ON item_venda.venda_id = vendas.id
            WHERE vendas.data_hora BETWEEN '${startDate}' AND '${endDate}'
            GROUP BY cervejas.id
            ORDER BY Qtd DESC;`,
            {
                replacements: { startDate, endDate },
                type: Sequelize.QueryTypes.SELECT
            }
        );
    }
}

export { CervejaService };
