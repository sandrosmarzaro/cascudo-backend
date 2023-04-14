import { DataTypes } from 'sequelize';

class Funcionario extends Gerente {
    static init(sequelize) {
        super.init({
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
                        msg: 'A data de nascimento deve estar no formato YYYY-MM-DD'
                    }
                }
            },
            foto: {
                type: DataTypes.BLOB('long'),
                allowNull: true
            }
        }, {
            sequelize,
            modelName: 'funcionario',
            tableName: 'funcionarios'
        });
    }
}

export { Funcionario };
