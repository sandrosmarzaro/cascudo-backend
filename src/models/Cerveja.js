import {Model, DataTypes} from 'sequelize';

class Cerveja extends Model {
    static init(sequelize) {
        super.init({
            qtdMaxEstoque: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'A quantidade máxima de estoque é obrigatória'
                    },
                    notEmpty: {
                        msg: 'A quantidade máxima de estoque não pode ser vazia'
                    },
                    isInt: {
                        msg: 'A quantidade máxima de estoque deve ser um número inteiro'
                    },
                    min: {
                        args: [0],
                        msg: 'A quantidade máxima de estoque deve ser maior ou igual a 0'
                    }
                }
            },
            qtdVazio: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'A quantidade de vazio é obrigatória'
                    },
                    notEmpty: {
                        msg: 'A quantidade de vazio não pode ser vazia'
                    },
                    isInt: {
                        msg: 'A quantidade de vazio deve ser um número inteiro'
                    },
                    min: {
                        args: [0],
                        msg: 'A quantidade de vazio deve ser maior ou igual a 0'
                    },
                    qtdMax() {
                        if (this.qtdVazio > this.qtdMaxEstoque) {
                            throw new Error('A quantidade de vazio não pode ser maior que a quantidade máxima de estoque');
                        }
                    },
                    qtdSomaMax() {
                        if (this.qtdVazio + this.qtdCheio > this.qtdMaxEstoque) {
                            throw new Error('A quantidade de vazio e cheio não pode ser maior que a quantidade máxima de estoque');
                        }
                    }
                }
            },
            qtdCheio: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'A quantidade de cheio é obrigatória'
                    },
                    notEmpty: {
                        msg: 'A quantidade de cheio não pode ser vazia'
                    },
                    isInt: {
                        msg: 'A quantidade de cheio deve ser um número inteiro'
                    },
                    min: {
                        args: [0],
                        msg: 'A quantidade de cheio deve ser maior ou igual a 0'
                    },
                    qtdMax() {
                        if (this.qtdCheio > this.qtdMaxEstoque) {
                            throw new Error('A quantidade de cheio não pode ser maior que a quantidade máxima de estoque');
                        }
                    },
                    qtdSomaMax() {
                        if (this.qtdVazio + this.qtdCheio > this.qtdMaxEstoque) {
                            throw new Error('A quantidade de vazio e cheio não pode ser maior que a quantidade máxima de estoque');
                        }
                    }
                }
            },
            qtdAlcool: {
                type: DataTypes.DECIMAL(2,2),
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'A quantidade de álcool é obrigatória'
                    },
                    notEmpty: {
                        msg: 'A quantidade de álcool não pode ser vazia'
                    },
                    isDecimal: {
                        msg: 'A quantidade de álcool deve ser um número decimal'
                    },
                    min: {
                        args: [0],
                        msg: 'A quantidade de álcool deve ser maior ou igual a 0'
                    },
                    max: {
                        args: [100],
                        msg: 'A quantidade de álcool deve ser menor ou igual a 100'
                    }
                }
            },
            precoCerveja: {
                type: DataTypes.DECIMAL(6,2),
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'O preço da cerveja é obrigatório'
                    },
                    notEmpty: {
                        msg: 'O preço da cerveja não pode ser vazio'
                    },
                    isDecimal: {
                        msg: 'O preço da cerveja deve ser um número decimal'
                    },
                    min: {
                        args: [0],
                        msg: 'O preço da cerveja deve ser maior ou igual a 0'
                    }
                }
            },
            precoCasco: {
                type: DataTypes.DECIMAL(6,2),
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'O preço do casco é obrigatório'
                    },
                    notEmpty: {
                        msg: 'O preço do casco não pode ser vazio'
                    },
                    isDecimal: {
                        msg: 'O preço do casco deve ser um número decimal'
                    },
                    min: {
                        args: [0],
                        msg: 'O preço do casco deve ser maior ou igual a 0'
                    }
                }
            },
            litragem: {
                type: DataTypes.ENUM('300', '600', '1000'),
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'A litragem é obrigatória'
                    },
                    notEmpty: {
                        msg: 'A litragem não pode ser vazia'
                    },
                    isIn: {
                        args: [['300', '600', '1000']],
                        msg: 'A litragem deve ser 300, 600 ou 1000'
                    }
                }
            },
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
            imagem: {
                type: DataTypes.BLOB('long'),
                allowNull: true,
            }
        }, {
            sequelize,
            modelName: 'cerveja',
            tableName: 'cervejas'
        });
    }

    static associate(models) {
        this.belongsTo(models.marca, {
            as: 'marca',
            foreignKey: {
                name: 'marcaId',
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'A marca é obrigatória'
                    },
                    notEmpty: {
                        msg: 'A marca não pode ser vazia'
                    }
                }
            }
        });
    }
}

export {Cerveja};
