import { Sequelize } from "sequelize";
import { dbConfig } from "./db.js"

import { Cliente } from "../models/Cliente.js";
import { Funcionario } from "../models/Funcionario.js";
import { Fornecedor } from "../models/Fornecedor.js";
import { Marca } from "../models/Marca.js";
import { Cerveja } from "../models/Cerveja.js";
import { ItemVenda } from "../models/ItemVenda.js";
import { Devolucao } from "../models/Devolucao.js";
import { ItemEntrada } from "../models/ItemEntrada.js";
import { Venda } from "../models/Venda.js";
import { Entrada } from "../models/Entrada.js";

const sequelize = new Sequelize(dbConfig);

Cliente.init(sequelize);
Funcionario.init(sequelize);
Fornecedor.init(sequelize);
Marca.init(sequelize);
Cerveja.init(sequelize);
Venda.init(sequelize);
ItemVenda.init(sequelize);
Devolucao.init(sequelize);
Entrada.init(sequelize);
ItemEntrada.init(sequelize);

Cliente.associate(sequelize.models);
Funcionario.associate(sequelize.models);
Fornecedor.associate(sequelize.models);
Marca.associate(sequelize.models);
Cerveja.associate(sequelize.models);
Venda.associate(sequelize.models);
ItemVenda.associate(sequelize.models);
Devolucao.associate(sequelize.models);
Entrada.associate(sequelize.models);
ItemEntrada.associate(sequelize.models);

async function populateDatase() {
    await sequelize.sync({ force: true });

    const funcionarios = [];
    funcionarios[0] = await Funcionario.create({
        nome: 'José da Silva',
        codigo: '001',
        dataNascimento: '1990-01-01',
        senha: 'senha123',
        foto: null,
        gerente: true
    });
    funcionarios[1] = await Funcionario.create({
        nome: 'Mariana Souza',
        codigo: '002',
        dataNascimento: '1995-05-05',
        senha: 'senha456',
        foto: null,
        gerente: false
    });
    funcionarios[2] = await Funcionario.create({
        nome: 'Luiz Oliveira',
        codigo: '003',
        dataNascimento: '2000-12-31',
        senha: 'senha789',
        foto: null,
        gerente: false
    });
    funcionarios[3] = await Funcionario.create({
        nome: 'Julia Santos',
        codigo: '004',
        dataNascimento: '1985-10-15',
        senha: 'senhaabc',
        foto: null,
        gerente: false
    });

    const clientes = [];
    clientes[0] = await Cliente.create({
        nome: 'João Silva',
        cpf: '12345678901',
        dataNascimento: '1990-01-01',
        email: 'joao.silva@example.com',
        foto: null
    });
    clientes[1] = await Cliente.create({
        nome: 'Maria Santos',
        cpf: '23456789012',
        dataNascimento: '1995-05-05',
        email: 'maria.santos@example.com',
        foto: null
    });
    clientes[2] = await Cliente.create({
        nome: 'Pedro Oliveira',
        cpf: '34567890123',
        dataNascimento: '2000-12-31',
        email: 'pedro.oliveira@example.com',
        foto: null
    });
    clientes[3] = await Cliente.create({
        nome: 'Ana Paula Souza',
        cpf: '45678901234',
        dataNascimento: '1985-10-15',
        email: 'ana.paula.souza@example.com',
        foto: null
    });

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
        totalComCasco: 0.00,
        clienteId: clientes[0].id,
        funcionarioId: funcionarios[0].id
    });
    vendas[1] = await Venda.create({
        dataHora: "2021-01-01T01:01:01",
        totalSemCasco: 0.00,
        totalComCasco: 0.00,
        clienteId: clientes[1].id,
        funcionarioId: funcionarios[1].id
    });
    vendas[2] = await Venda.create({
        dataHora: "2022-01-01T02:02:02",
        totalSemCasco: 0.00,
        totalComCasco: 0.00,
        clienteId: clientes[2].id,
        funcionarioId: clientes[2].id
    });
    vendas[3] = await Venda.create({
        dataHora: "2023-01-01T03:03:03",
        totalSemCasco: 0.00,
        totalComCasco: 0.00,
        clienteId: clientes[3].id,
        funcionarioId: clientes[3].id
    });

    const entradas = [];
    entradas[0] = await Entrada.create({
        dataHora: "2020-01-01T00:00:00",
        funcionarioId: funcionarios[0].id
    });
    entradas[1] = await Entrada.create({
        dataHora: "2021-01-01T01:01:01",
        funcionarioId: funcionarios[1].id
    });
    entradas[2] = await Entrada.create({
        dataHora: "2022-01-01T02:02:02",
        funcionarioId: funcionarios[2].id
    });
    entradas[3] = await Entrada.create({
        dataHora: "2023-01-01T03:03:03",
        funcionarioId: funcionarios[3].id
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

    const itensEntrada = [];
    itensEntrada[0] = await ItemEntrada.create({
        quantidade: 1,
        valorCerveja: 7.50,
        valorCasco: 2.00,
        fornecedorSelecionado: 1,
        cervejaId: cervejas[0].id,
        entradaId: entradas[0].id
    });
    itensEntrada[1] = await ItemEntrada.create({
        quantidade: 2,
        valorCerveja: 10.90,
        valorCasco: 5.00,
        fornecedorSelecionado: 2,
        cervejaId: cervejas[1].id,
        entradaId: entradas[1].id
    });
    itensEntrada[2] = await ItemEntrada.create({
        quantidade: 3,
        valorCerveja: 8.25,
        valorCasco: 1.50,
        fornecedorSelecionado: 3,
        cervejaId: cervejas[2].id,
        entradaId: entradas[2].id
    });
    itensEntrada[3] = await ItemEntrada.create({
        quantidade: 4,
        valorCerveja: 2.50,
        valorCasco: 0.75,
        fornecedorSelecionado: 4,
        cervejaId: cervejas[3].id,
        entradaId: entradas[3].id
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
