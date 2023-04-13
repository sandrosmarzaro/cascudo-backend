import { Model, DataTypes } from 'sequelize';

class Gerente extends Model {
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
            codigo: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: 'Já existe um gerente com este código'
                },
                validate: {
                    notNull: {
                        msg: 'O código é obrigatório'
                    },
                    notEmpty: {
                        msg: 'O código não pode ser vazio'
                    }
                }
            },
            senha: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'A senha é obrigatória'
                    },
                    notEmpty: {
                        msg: 'A senha não pode ser vazia'
                    },
                    len: {
                        args: [1, 8],
                        msg: 'A senha deve ter entre 1 e 8 caracteres'
                    }
                }
            },
        }, {
            sequelize,
            modelName: 'gerente',
            tableName: 'gerente'
        });
    }
}

export { Gerente };
