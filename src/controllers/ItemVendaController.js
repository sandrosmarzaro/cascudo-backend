import { ItemVendaService } from '../services/ItemVendaService.js';

class ItemVendaController {
    static async index(req, res, next) {
        ItemVendaService.index()
            .then((itemvendas) => res.json(itemvendas))
            .catch(next);
    }

    static async show(req, res, next) {
        ItemVendaService.show(req)
            .then((itemvenda) => res.json(itemvenda))
            .catch(next);
    }

    static async store(req, res, next) {
        ItemVendaService.store(req)
            .then((itemvenda) => res.json(itemvenda))
            .catch(next);
    }

    static async updateParcial(req, res, next) {
        ItemVendaService.updateParcial(req)
            .then((itemvenda) => res.json(itemvenda))
            .catch(next);
    }

    static async updateTotal(req, res, next) {
        ItemVendaService.updateTotal(req)
            .then((itemvenda) => res.json(itemvenda))
            .catch(next);
    }

    static async destroy(req, res, next) {
        ItemVendaService.destroy(req)
            .then((itemvenda) => res.json(itemvenda))
            .catch(next);
    }
}

export { ItemVendaController };

