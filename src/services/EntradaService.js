import { Entrada } from "../models/Entrada.js";

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
        return await Entrada.create({ dataHora, itensEntrada, funcionarioId }); 
        //{ include: 'itensEntrada' }); //Trecho para consultar todos os itens relacionados a entrada pesquisada(junto).
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
}

export { EntradaService };
