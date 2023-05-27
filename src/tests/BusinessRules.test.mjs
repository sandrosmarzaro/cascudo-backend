import axios from 'axios';
import jest from 'jest';

const uri = 'http://localhost:3000/venda';

test ('should don\'t sale without beer in stock', async () => {
        const body = {
            dataHora: "2020-01-01T03:00:00.000Z",
            totalSemCasco: 9,
            totalComCasco: 7,
            clienteId: 4,
            funcionarioId: 1,
            itensVenda: [
                {
                    quantidade: 1,
                    valorCerveja: 7,
                    valorCasco: 2,
                    cervejaId: 1
                }
            ],
            devolucoes: [
                {
                    quantidade: 2,
                    valorCasco: 2,
                    cervejaId: 1
                }
            ]
        };
        const response = await axios.post(uri, body);

        expect(response.status).toBe(400);
        expect(response.data).toBe('Não foi possível criar a venda: Não há espaço nas grades disponível');
});

test ('should don\'t sale without bottle stock avaible', async () => {

});

test ('should sale without discount', async () => {

});

test ('should sale with discount', async () => {

});

