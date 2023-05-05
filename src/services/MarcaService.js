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

    static async updateParcial(req) {
        const { id } = req.params;
        const marca = await Marca.findByPk(id, { include: { all: true, nested: true } });
        if (!marca) {
            throw "Marca não encontrada";
        }
        await marca.update(req.body);
        return await Marca.findByPk(id, { include: { all: true, nested: true } });
    }

    static async updateTotal(req) {
        const { id } = req.params;
        const { nome, logo, origem, fornecedorId } = req.body;
        const marca = await Marca.findByPk(id, { include: { all: true, nested: true } });
        if (!marca) {
            throw "Marca não encontrada";
        }
        Object.assign(marca, { nome, logo, origem, fornecedorId });
        await marca.save();
        return await Marca.findByPk(id, { include: { all: true, nested: true } });
    }

    static async destroy(req) {
        const { id } = req.params;
        const marca = await Marca.findByPk(id, { include: { all: true, nested: true } });
        if (!marca) {
            throw "Marca não encontrada";
        }
        try {
            return await marca.destroy();
        }
        catch (err) {
            throw "Não foi possível deletar a marca";
        }
    }
}

export { MarcaService };
