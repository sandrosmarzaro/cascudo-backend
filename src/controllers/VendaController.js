import { VendaService } from '../services/VendaService.js';

class VendaController {
    static async index(req, res, next) {
        VendaService.index()
            .then((vendas) => res.json(vendas))
            .catch(next);
    }

    static async show(req, res, next) {
        VendaService.show(req)
            .then((venda) => res.json(venda))
            .catch(next);
    }

    static async store(req, res, next) {
        VendaService.store(req)
            .then((venda) => res.json(venda))
            .catch(next);
    }

    static async updateParcial(req, res, next) {
        VendaService.updateParcial(req)
            .then((venda) => res.json(venda))
            .catch(next);
    }

    static async updateTotal(req, res, next) {
        VendaService.updateTotal(req)
            .then((venda) => res.json(venda))
            .catch(next);
    }

    static async destroy(req, res, next) {
        VendaService.destroy(req)
            .then((venda) => res.json(venda))
            .catch(next);
    }
}

export { VendaController };
