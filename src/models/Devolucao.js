import { Model, DataTypes } from 'sequelize';

class Devolucao extends Model {
    static init(sequelize) {
        super.init({
            quantidade: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'A quantidade é obrigatória'
                    },
                    notEmpty: {
                        msg: 'A quantidade não pode ser vazia'
                    },
                    isInt: {
                        msg: 'A quantidade deve ser um número inteiro'
                    },
                    min: {
                        args: [1],
                        msg: 'A quantidade deve ser maior ou igual a 1'
                    }
                }
            },
            valorCasco: {
                type: DataTypes.DECIMAL(6, 2),
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'O valor do casco é obrigatório'
                    },
                    notEmpty: {
                        msg: 'O valor do casco não pode ser vazio'
                    },
                    isDecimal: {
                        msg: 'O valor do casco deve ser um número decimal'
                    },
                    min: {
                        args: [0],
                        msg: 'O valor do casco deve ser maior ou igual a 0'
                    }
                }
            }
        }, {
            sequelize,
            modelName: 'devolucao',
            tableName: 'devolucoes'
        });
    }

    static associate(models) {
        this.belongsTo(models.venda, {
            as: 'venda',
            foreignKey: {
                name: 'vendaId',
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'A venda é obrigatória'
                    },
                    notEmpty: {
                        msg: 'A venda não pode ser vazia'
                    }
                }
            }
        });
        this.belongsTo(models.cerveja, {
            as: 'cerveja',
            foreignKey: {
                name: 'cervejaId',
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'A cerveja é obrigatória'
                    },
                    notEmpty: {
                        msg: 'A cerveja não pode ser vazia'
                    }
                }
            }
        });
    }
}

export { Devolucao };
