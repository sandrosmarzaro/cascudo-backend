import { Model, DataTypes } from 'sequelize';

class Venda extends Model {
    static init(sequelize) {
        super.init({
            dataHora: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'A data e hora são obrigatórias'
                    },
                    notEmpty: {
                        msg: 'A data e hora não podem ser vazias'
                    }
                }
            },
            totalSemCasco: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'O total sem casco é obrigatório'
                    },
                    notEmpty: {
                        msg: 'O total sem casco não pode ser vazio'
                    },
                    isDecimal: {
                        msg: 'O total sem casco deve ser um número decimal'
                    },
                    min: {
                        args: [0],
                        msg: 'O total sem casco deve ser maior ou igual a 0'
                    }
                }
            },
            totalComCasco: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'O total com casco é obrigatório'
                    },
                    notEmpty: {
                        msg: 'O total com casco não pode ser vazio'
                    },
                    isDecimal: {
                        msg: 'O total com casco deve ser um número decimal'
                    },
                    min: {
                        args: [0],
                        msg: 'O total com casco deve ser maior ou igual a 0'
                    }
                }
            }
        }, {
            sequelize,
            modelName: 'venda',
            tableName: 'vendas'
        });
    }

    static associate(models) {
        this.hasMany(models.itemVenda, {
            as: {
                singular: 'itemVenda',
                plural: 'itensVenda'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        this.hasMany(models.devolucao, {
            as: {
                singular: 'devolucao',
                plural: 'devolucoes'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    }
}

export { Venda };
