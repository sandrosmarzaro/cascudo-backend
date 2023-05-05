import { Cerveja } from '../models/Cerveja.js';

class CervejaService {
    static async index() {
        return await Cerveja.findAll({ include: { all: true, nested: true } });
    }

    static async show(req) {
        const { id } = req.params;
        return await Cerveja.findByPk(id, { include: { all: true, nested: true } });
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
        return await cerveja.update(req.body);
    }

    static async updateTotal(req) {
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
        const cerveja = await Cerveja.findByPk(id, { include: { all: true, nested: true } });
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
        return await cerveja.save();
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
}

export { CervejaService };
