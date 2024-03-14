const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Dados de avaliação por provedor (simulados para este exemplo)
let avaliacoesPorProvedor = {};

// Middleware para permitir requisições de outros domínios
app.use(cors());

// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de avaliações de provedores de internet');
})

// Rota para receber as avaliações e calcular o score final
app.post('/api/avaliacoes/:provedor', (req, res) => {
  const provedor = req.params.provedor;
  const { qualidadeConexao, suporteCliente, coberturaServico, preco, segurancaRede } = req.body;

  // Armazena as avaliações do provedor ou adiciona novas avaliações caso já existam
  if (!avaliacoesPorProvedor[provedor]) {
    avaliacoesPorProvedor[provedor] = [];
  }
  avaliacoesPorProvedor[provedor].push({ qualidadeConexao, suporteCliente, coberturaServico, preco, segurancaRede });

  // Calcula o score final para o provedor
  const totalAvaliacoes = avaliacoesPorProvedor[provedor].reduce((acc, cur) => {
    return acc + (cur.qualidadeConexao + cur.suporteCliente + cur.coberturaServico + cur.preco + cur.segurancaRede);
  }, 0);
  console.log('totalAvaliacoes', totalAvaliacoes)
  const numAvaliacoes = avaliacoesPorProvedor[provedor].length;
  const scoreFinal = numAvaliacoes > 0 ? totalAvaliacoes / (5 * numAvaliacoes) : 0;

  res.json({ provedor, scoreFinal });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor pronto em http://localhost:${PORT}`);
});
