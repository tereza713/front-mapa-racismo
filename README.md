# 🗺️ Mapa do Racismo — Front-end

Este é o repositório do front-end do projeto **Mapa do Racismo**, uma aplicação desenvolvida para **denunciar, visualizar e combater casos de racismo** através de um mapa interativo. Com foco em acessibilidade e impacto social, a aplicação foi construída utilizando **Next.js**, **TailwindCSS**, **TypeScript** e outras tecnologias modernas para garantir performance, escalabilidade e usabilidade.

## 📌 Contextualização

O projeto nasce da necessidade urgente de se ter um espaço seguro e acessível onde denúncias de racismo possam ser registradas e visualizadas por qualquer pessoa. Ao usar um mapa como elemento central, conseguimos **georreferenciar os casos** e promover **ações informadas**, seja por órgãos públicos, ONGs ou pela sociedade civil.

A aplicação permite:
- Cadastro e listagem de denúncias;
- Visualização no mapa com filtros por local e tipo;
- Interface limpa e intuitiva para incentivar o uso.

---

## ⚙️ Tecnologias Utilizadas

| Tecnologia         | Versão utilizada     |
|--------------------|----------------------|
| [Next.js](https://nextjs.org/)          | `14.x`                |
| [TypeScript](https://www.typescriptlang.org/)     | `5.x`                 |
| [TailwindCSS](https://tailwindcss.com/)          | `3.x`                 |
| [Lucide React](https://lucide.dev/)              | `0.319.x`             |
| [ShadCN/UI](https://ui.shadcn.dev/)              | (última versão)       |
| [React](https://react.dev/)                     | `18.x`                |

---

## 🚀 Como rodar o projeto localmente

### ✅ Pré-requisitos

- [Node.js](https://nodejs.org/en/) versão 18 ou superior
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- A API deve estar rodando localmente (ou fornecida em um endereço remoto)

---

### 👣 Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/front-mapa-racismo.git
cd front-mapa-racismo

# 2. Instale as dependências
npm install

# ou, se preferir yarn:
# yarn

# 3. Configure as variáveis de ambiente
# Crie um arquivo .env.local e adicione a URL da sua API:
NEXT_PUBLIC_API_URL=http://localhost:3333

# 4. Inicie o servidor de desenvolvimento
npm run dev

# ou
# yarn dev
