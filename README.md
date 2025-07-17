
# 🗺️ Mapa do Racismo — API + Front-end

Este é um projeto completo com **API e Front-end** desenvolvido para registrar e exibir denúncias de racismo por meio de um mapa interativo. A proposta é oferecer uma plataforma acessível, informativa e de impacto social.

---

## ✊🏾 Sobre o Projeto

A aplicação permite:
- Cadastro de denúncias de racismo;
- Visualização das denúncias em um mapa;
- Interface moderna e acessível.

---

## ⚙️ Tecnologias Utilizadas

### Backend (API)
- Node.js 18+
- Express
- Sequelize
- PostgreSQL
- Neon (opcional)

### Frontend
- Next.js 14
- React 18
- TypeScript 5
- TailwindCSS
- ShadCN UI
- Lucide React

---

## ▶️ Como rodar o projeto

### 🔧 API

```bash
# Clone o repositório da API
git clone <link-da-api>
cd api-mapa-racismo

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute as migrations
npx sequelize db:migrate

# Inicie o servidor
npm run dev
```

A API ficará disponível em: `http://localhost:3333`

---

### 💻 Front-end

```bash
# Clone o repositório do front
git clone <link-do-front>
cd front-mapa-racismo

# Instale as dependências
npm install

# Crie o arquivo de variáveis de ambiente
cp .env.local.example .env.local

# Adicione a URL da API
NEXT_PUBLIC_API_URL=http://localhost:3333

# Inicie o servidor
npm run dev
```

O front ficará disponível em: `http://localhost:3000`

---

## 🌐 Projeto online

Você pode acessar a versão hospedada aqui:

👉 https://front-mapa-racismo-qnzk.vercel.app

---

## 🖼️ Imagens do projeto


- 📷 Home:
  <img width="930" height="446" alt="image" src="https://github.com/user-attachments/assets/03d6ca7e-9833-41e6-bbff-d3a5416fbe99" />


---

## 👩🏾‍💻 Feito com propósito social
