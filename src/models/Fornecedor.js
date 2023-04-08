import { Model, DataTypes } from 'sequelize';

class Fornecedor extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'O nome é obrigatório'
                    },
                    notEmpty: {
                        msg: 'O nome não pode ser vazio'
                    },
                    len: {
                        args: [1, 100],
                        msg: 'O nome deve ter entre 1 e 100 caracteres'
                    }
                }
            },
            logo: {
                type: DataTypes.BLOB('long'),
                allowNull: true
            },
            endereco: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'O endereço é obrigatório'
                    },
                    notEmpty: {
                        msg: 'O endereço não pode ser vazio'
                    },
                    len: {
                        args: [1, 100],
                        msg: 'O endereço deve ter entre 1 e 100 caracteres'
                    }
                }
            },
            horaEntrega: {
                type: DataTypes.TIME,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'A hora de entrega é obrigatória'
                    },
                    notEmpty: {
                        msg: 'A hora de entrega não pode ser vazia'
                    }
                }
            },
            diaEntrega: {
                type: DataTypes.ENUM('domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'),
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'O dia de entrega é obrigatório'
                    },
                    notEmpty: {
                        msg: 'O dia de entrega não pode ser vazio'
                    },
                    isIn: {
                        args: [['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']],
                        msg: 'O dia de entrega deve ser uma das opções'
                    }
                }
            }
        }, {
            sequelize,
            modelName: 'fornecedor',
            tableName: 'fornecedores'
        });
    }

    static associate(models) {
    }
}

export { Fornecedor };
