const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Dados de avaliação por provedor (simulados para este exemplo)
let avaliacoesPorProvedor = {};
let provedores = [];

// Middleware para permitir requisições de outros domínios
app.use(cors());

// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de avaliações de provedores de internet');
});

// Rota para cadastrar os provedores
app.post('/api/cadastro', (req, res) => {
  const { nome } = req.body;
  provedores.push(nome);
  res.json({ message: `Provedor ${nome} cadastrado com sucesso!` });
});

// Rota para receber as avaliações e calcular o score final
app.post('/api/avaliacoes/:provedor', (req, res) => {
  const provedor = req.params.provedor;
  const { qualidadeConexao, suporteCliente, coberturaServico, preco, segurancaRede } = req.body;

  // Verifica se o provedor está cadastrado
  if (!provedores.includes(provedor.replace(':', ''))) {
    return res.status(404).json({ error: `Provedor ${provedor} não encontrado.` });
  }

  // Adiciona apenas a última avaliação de cada categoria para o provedor
  const ultimaAvaliacao = {
    qualidadeConexao,
    suporteCliente,
    coberturaServico,
    preco,
    segurancaRede
  };

  // Armazena ou atualiza a última avaliação para o provedor
  if (!avaliacoesPorProvedor[provedor]) {
    avaliacoesPorProvedor[provedor] = [];
  }
  avaliacoesPorProvedor[provedor] = [ultimaAvaliacao];

  // Calcula o score final para o provedor com base na última avaliação
  const totalAvaliacoes = avaliacoesPorProvedor[provedor].length;
  const somaTotal = avaliacoesPorProvedor[provedor].reduce((acc, avaliacao) => {
    return acc + (avaliacao.qualidadeConexao + avaliacao.suporteCliente + avaliacao.coberturaServico + avaliacao.preco + avaliacao.segurancaRede);
  }, 0);
  const scoreFinal = somaTotal / (totalAvaliacoes * 5); // 5 é o máximo de pontos possíveis por categoria

  res.json({ provedor, scoreFinal });
});

// Rota para obter a lista de provedores cadastrados
app.get('/api/provedores', (req, res) => {
  res.json({ provedores });
});

// Rota para obter as avaliações de um provedor específico
app.get('/api/avaliacoes/:provedor', (req, res) => {
  const provedor = req.params.provedor;
  
  // Verifica se o provedor está cadastrado
  if (!provedores.includes(provedor.replace(':', ''))) {
    return res.status(404).json({ error: `Provedor ${provedor} não encontrado.` });
  }

  // Verifica se há avaliações para o provedor
  if (!avaliacoesPorProvedor[provedor] || avaliacoesPorProvedor[provedor].length === 0) {
    return res.json({ provedor, avaliacoes: [{
      qualidadeConexao: 0,
      suporteCliente: 0,
      coberturaServico: 0,
      preco: 0,
      segurancaRede: 0,
    }] });
  }
  const totalAvaliacoes = avaliacoesPorProvedor[provedor].length;
  const somaTotal = avaliacoesPorProvedor[provedor].reduce((acc, avaliacao) => {
    return acc + (avaliacao.qualidadeConexao + avaliacao.suporteCliente + avaliacao.coberturaServico + avaliacao.preco + avaliacao.segurancaRede);
  }, 0);
  const scoreFinal = somaTotal / (totalAvaliacoes * 5);
  // Retorna as avaliações do provedor
  const avaliacoes = avaliacoesPorProvedor[provedor];
  res.json({ provedor, avaliacoes, scoreFinal });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor pronto em http://localhost:${PORT}`);
});
