function errorHandler(err, req, res, next) {
    switch (true) {
        case typeof err === 'string':
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        default:
            if (err.name === 'SequelizeValidationError') {
                return res.status(400).json({ message: err.errors.map(field => field.message).join(" ") });
            }
            else if (err.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({
                    message: "Pelo menos um dos conceitos associados a esta inserção ou alteração não existe!"
                });
            }
            else if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: "Não podem existir dois registros com a mesma chave!" });
            }
            else {
                return res.status(500).json({ message: err.message });
            }
    }
}

export default errorHandler;
