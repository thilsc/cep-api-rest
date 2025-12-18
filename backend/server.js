const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Rota Raiz (Solução do erro 404/CSP)
app.get('/', (req, res) => {
    res.send('<h2>API de Consulta CEP rodando!</h2><p>Use o endpoint /api/consulta-cep/SEU_CEP</p>');
});

// Endpoint de consulta
app.get('/api/consulta-cep/:cep', async (req, res) => {
    const cep = req.params.cep.replace(/\D/g, '');

    if (cep.length !== 8) {
        return res.status(400).json({ error: 'CEP inválido.' });
    }

    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        
        if (response.data.erro) {
            return res.status(404).json({ error: 'CEP não encontrado.' });
        }

        const dados = response.data;
        res.json({
            cep: dados.cep,
            logradouro: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf,
            codigo_ibge: dados.ibge,
            ddd: dados.ddd
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao consultar API externa.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
