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

    static async update(req) {
        const { id } = req.params;
        const cerveja = await Cerveja.findByPk(id, { include: { all: true, nested: true } });
        return await Cerveja.update(cerveja);
    }

    static async destroy(req) {
        const { id } = req.params;
        const cerveja = await Cerveja.findByPk(id, { include: { all: true, nested: true } });
        return await cerveja.destroy();
    }
}

export { CervejaService };
