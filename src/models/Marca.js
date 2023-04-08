import {Model, DataTypes} from 'sequelize';
import paises from '../utils/paises.js';

class Marca extends Model {
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
            origem: {
                type: DataTypes.ENUM(...paises),
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'A origem é obrigatória'
                    },
                    notEmpty: {
                        msg: 'A origem não pode ser vazia'
                    },
                    isIn: {
                        args: [paises],
                        msg: 'A origem deve ser um país válido'
                    }
                }
            }
        }, {
            sequelize,
            modelName: 'marca',
            tableName: 'marcas'
        });
    }

    static associate(models) {
        this.belongsTo(models.fornecedor, {
            as: 'fornecedor',
            foreignKey: {
                name: 'fornecedorId',
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'O fornecedor é obrigatório'
                    },
                    notEmpty: {
                        msg: 'O fornecedor não pode ser vazio'
                    }
                }
            }
        });
    }
}

export { Marca };
