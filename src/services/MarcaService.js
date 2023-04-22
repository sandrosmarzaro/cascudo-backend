import { Marca } from "../models/Marca.js";

class MarcaService {
    static async index() {
        return await Marca.findAll({ include: { all: true, nested: true } });
    }

    static async show(req) {
        const { id } = req.params;
        return await Marca.findByPk(id, { include: { all: true, nested: true } });
    }

    static async store(req) {
        const { nome, logo, origem, fornecedorId } = req.body;
        return await Marca.create({ nome, logo, origem, fornecedorId });
    }

    static async update(req) {
        const { id } = req.params;
        const marca = await Marca.findByPk(id, { include: { all: true, nested: true } });
        return await marca.update(req.body);
    }

    static async destroy(req) {
        const { id } = req.params;
        const marca = await Marca.findByPk(id, { include: { all: true, nested: true } });
        return await marca.destroy();
    }
}

export { MarcaService };
