const express = require('express');
const router = express.Router();

// Dados de exemplo (ficará melhor com banco de dados depois)
const denuncias = [
  {
    id: 1,
    titulo: 'Ato de racismo em escola',
    descricao: 'Relato de injúria racial em sala de aula.',
    localizacao: 'São Paulo, SP',
    data: '2025-07-13',
    lat: -23.5505,
    lng: -46.6333
  },
  {
    id: 2,
    titulo: 'Discriminação em empresa',
    descricao: 'Funcionário sofreu racismo estrutural no trabalho.',
    localizacao: 'Salvador, BA',
    data: '2025-07-12',
    lat: -12.9777,
    lng: -38.5016
  },
];

// GET /denuncias — retorna o array de denúncias
router.get('/', (req, res) => {
  res.json(denuncias);
});

// (Opcional) POST /denuncias — cria nova denúncia (para permitir envio via frontend)
router.post('/', (req, res) => {
  const { titulo, descricao, localizacao, data, lat, lng } = req.body;
  const nova = { id: Date.now(), titulo, descricao, localizacao, data, lat, lng };
  denuncias.push(nova);
  res.status(201).json(nova);
});

module.exports = router;
