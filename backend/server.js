const express = require('express');
const cors = require('cors');
const denunciasRoutes = require('./routes/denuncias');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Todas as requisições para /denuncias vão ao nosso router
app.use('/denuncias', denunciasRoutes);

app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
});