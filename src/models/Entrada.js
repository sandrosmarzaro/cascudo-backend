//Responsável: Gabriel.
import { Model, DataTypes } from 'sequelize';

class Entrada extends Model {
    static init(sequelize) {
        super.init(
            {
                dataHora: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    validate: {
                        notNull: {
                            msg: 'A data e hora são obrigatórias',
                        },
                        notEmpty: {
                            msg: 'A data e hora não podem ser vazias',
                        },
                    },
                },
            },
            {
                sequelize,
                modelName: 'entrada',
                tableName: 'entradas',
            }
        );
    }

    static associate(models) {
        this.hasMany(models.itemEntrada, {
            as: {
                singular: 'itemEntrada',
                plural: 'itensEntrada'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        this.belongsTo(models.funcionario, {
            as: 'funcionario',
            foreignKey: {
                name: 'funcionarioId',
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'O campo é obrigatório'
                    },
                    notEmpty: {
                        msg: 'O campo não pode ser vazio'
                    }
                }
            }
        });
    }
}

export { Entrada };
