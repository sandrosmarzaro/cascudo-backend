//Responsável: Gabriel Cardoso.
import { Model, DataTypes } from 'sequelize';

class Cliente extends Model {
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
            cpf: {
                type: DataTypes.STRING(11),
                allowNull: false,
                unique: {
                    msg: 'Já existe um cliente cadastrado com este CPF'
                },
                validate: {
                    notNull: {
                        msg: 'O CPF é obrigatório'
                    },
                    notEmpty: {
                        msg: 'O CPF não pode ser vazio'
                    },
                    is: {
                        args: /^\d{11}$/,
                        msg: 'O CPF deve ter 11 dígitos numéricos'
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
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: 'Já existe um cliente cadastrado com este e-mail'
                },
                validate: {
                    notNull: {
                        msg: 'O e-mail é obrigatório'
                    },
                    notEmpty: {
                        msg: 'O e-mail não pode ser vazio'
                    },
                    isEmail: {
                        msg: 'O e-mail deve ser um endereço de e-mail válido'
                    }
                }
            },
            qtdCascosDevolvidos: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    notNull: {
                        msg: 'A quantidade de cascos devolvidos é obrigatória'
                    },
                    notEmpty: {
                        msg: 'A quantidade de cascos devolvidos não pode ser vazia'
                    },
                    isInt: {
                        msg: 'A quantidade de cascos devolvidos deve ser um número inteiro'
                    },
                    min: {
                        args: [0],
                        msg: 'A quantidade de cascos devolvidos deve ser no mínimo 0'
                    }
                }
            },
            foto: {
                type: DataTypes.BLOB('long'),
                get() {
                    return Buffer.from(this.getDataValue('foto')).toString(); // Retornando no formato String
                },
                allowNull: true
            }
        }, {
            sequelize,
            modelName: 'cliente',
            tableName: 'clientes'
        });
    }

    static associate(models) {

    }
}

export { Cliente };
