import { Sequelize, TIME } from "sequelize";
import { dbConfig } from "./db.js"

import { Fornecedor } from "../models/Fornecedor.js";
import { Marca } from "../models/Marca.js";
import { Cerveja } from "../models/Cerveja.js";
import { ItemVenda } from "../models/ItemVenda.js";
import { Devolucao } from "../models/Devolucao.js";
import { Venda } from "../models/Venda.js";

const sequelize = new Sequelize(dbConfig);

Fornecedor.init(sequelize);
Marca.init(sequelize);
Cerveja.init(sequelize);
Venda.init(sequelize);
ItemVenda.init(sequelize);
Devolucao.init(sequelize);

Fornecedor.associate(sequelize.models);
Marca.associate(sequelize.models);
Cerveja.associate(sequelize.models);
Venda.associate(sequelize.models);
ItemVenda.associate(sequelize.models);
Devolucao.associate(sequelize.models);

async function populateDatase() {
    await sequelize.sync({ force: true });

    const fornedecores = [];
    fornedecores[0] = await Fornecedor.create({
        nome: "Ambev",
        endereco: "Rua das Cervejas, 123",
        diaEntrega: "segunda",
        horaEntrega: "08:00:00"
    });
    fornedecores[1] = await Fornecedor.create({
        nome: "Lippaus",
        endereco: "Rua das Cervejas, 456",
        diaEntrega: "quarta",
        horaEntrega: "12:30:45"
    });
    fornedecores[2] = await Fornecedor.create({
        nome: "Coca-Cola",
        endereco: "Rua das Cervejas, 789",
        diaEntrega: "sexta",
        horaEntrega: "18:40:10"
    });
    fornedecores[3] = await Fornecedor.create({
        nome: "Grupo Petrópolis",
        endereco: "Rua das Cervejas, 101",
        diaEntrega: "domingo",
        horaEntrega: "07:59:59"
    });

    const marcas = [];
    marcas[0] = await Marca.create({
        nome: "Skol",
        origem: "Dinamarca",
        fornecedorId: fornedecores[0].id
    });
    marcas[1] = await Marca.create({
        nome: "Heineken",
        origem: "Holanda",
        fornecedorId: fornedecores[1].id
    });
    marcas[2] = await Marca.create({
        nome: "Eisenbahn",
        origem: "Alemanha",
        fornecedorId: fornedecores[2].id
    });
    marcas[3] = await Marca.create({
        nome: "Itaipava",
        origem: "Brasil",
        fornecedorId: fornedecores[3].id
    });

    const cervejas = [];
    cervejas[0] = await Cerveja.create({
        nome: "Skol Litrão",
        qtdMaxEstoque: 100,
        qtdCheio: 100,
        qtdVazio: 0,
        qtdAlcool: 4.7,
        precoCerveja: 7.00,
        precoCasco: 2.00,
        litragem: "1000",
        marcaId: marcas[0].id
    });
    cervejas[1] = await Cerveja.create({
        nome: "Heineken Garrafa",
        qtdMaxEstoque: 240,
        qtdCheio: 120,
        qtdVazio: 120,
        qtdAlcool: 5.0,
        precoCerveja: 10.90,
        precoCasco: 5.00,
        litragem: "600",
        marcaId: marcas[1].id
    });
    cervejas[2] = await Cerveja.create({
        nome: "Eisenbahn Garrafa",
        qtdMaxEstoque: 80,
        qtdCheio: 60,
        qtdVazio: 20,
        qtdAlcool: 4.8,
        precoCerveja: 8.25,
        precoCasco: 1.50,
        litragem: "600",
        marcaId: marcas[2].id
    });
    cervejas[3] = await Cerveja.create({
        nome: "Itaipava Litrinho",
        qtdMaxEstoque: 48,
        qtdCheio: 12,
        qtdVazio: 36,
        qtdAlcool: 4.5,
        precoCerveja: 2.50,
        precoCasco: 0.75,
        litragem: "300",
        marcaId: marcas[3].id
    });

    const vendas = [];
    vendas[0] = await Venda.create({
        dataHora: "2020-01-01T00:00:00",
        totalSemCasco: 0.00,
        totalComCasco: 0.00
    });
    vendas[1] = await Venda.create({
        dataHora: "2021-01-01T01:01:01",
        totalSemCasco: 0.00,
        totalComCasco: 0.00
    });
    vendas[2] = await Venda.create({
        dataHora: "2022-01-01T02:02:02",
        totalSemCasco: 0.00,
        totalComCasco: 0.00
    });
    vendas[3] = await Venda.create({
        dataHora: "2023-01-01T03:03:03",
        totalSemCasco: 0.00,
        totalComCasco: 0.00
    });

    const itensVenda = [];
    itensVenda[0] = await ItemVenda.create({
        quantidade: 1,
        valorCerveja: 7.50,
        valorCasco: 2.00,
        cervejaId: cervejas[0].id,
        vendaId: vendas[0].id
    });
    itensVenda[1] = await ItemVenda.create({
        quantidade: 2,
        valorCerveja: 10.90,
        valorCasco: 5.00,
        cervejaId: cervejas[1].id,
        vendaId: vendas[1].id
    });
    itensVenda[2] = await ItemVenda.create({
        quantidade: 3,
        valorCerveja: 8.25,
        valorCasco: 1.50,
        cervejaId: cervejas[2].id,
        vendaId: vendas[2].id
    });
    itensVenda[3] = await ItemVenda.create({
        quantidade: 4,
        valorCerveja: 2.50,
        valorCasco: 0.75,
        cervejaId: cervejas[3].id,
        vendaId: vendas[3].id
    });

    const devolucoes = [];
    devolucoes[0] = await Devolucao.create({
        quantidade: 1,
        valorCasco: 2.00,
        cervejaId: cervejas[0].id,
        vendaId: vendas[0].id
    });
    devolucoes[1] = await Devolucao.create({
        quantidade: 2,
        valorCasco: 5.00,
        cervejaId: cervejas[1].id,
        vendaId: vendas[1].id
    });
    devolucoes[2] = await Devolucao.create({
        quantidade: 3,
        valorCasco: 1.50,
        cervejaId: cervejas[2].id,
        vendaId: vendas[2].id
    });
    devolucoes[3] = await Devolucao.create({
        quantidade: 4,
        valorCasco: 0.75,
        cervejaId: cervejas[3].id,
        vendaId: vendas[3].id
    });
}

populateDatase();
export default sequelize;
