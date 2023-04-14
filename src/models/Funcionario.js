//Responsável: Gabriel Cardoso.
import { Model, DataTypes } from 'sequelize';

class Funcionario extends Model {
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
                    msg: 'Já existe um funcionário cadastrado com este código'
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
            dataNascimento: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'A data de nascimento é obrigatória'
                    },
                    notEmpty: {
                        msg: 'A data de nascimento não pode ser vazia'
                    },
                    isDate: {
                        msg: 'A data de nascimento deve ser uma data válida'
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
                        args: [6, 20],
                        msg: 'A senha deve ter entre 6 e 20 caracteres'
                    }
                }
            },
            foto: {
                type: DataTypes.BLOB('long'),
                allowNull: true
            },
            gerente: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }, {
            sequelize,
            modelName: 'funcionario',
            tableName: 'funcionarios'
        });
    }

    static associate(models) {

    }
}

export { Funcionario };
