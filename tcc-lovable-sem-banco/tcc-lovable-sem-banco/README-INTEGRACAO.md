# Integração do front Lovable com o backend Node

Este pacote une o frontend criado no Lovable com o backend em Node.js/MongoDB.

## Rodar tudo com um comando

Na pasta principal:

```bash
npm install
npm install --prefix backend
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:3000`

## Configurar MongoDB

Entre em `backend` e crie o arquivo `.env` copiando o `.env.example`.

Para MongoDB local:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/tcc_seguranca_feminina
JWT_SECRET=troque_essa_chave_por_uma_chave_grande
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

Depois deixe o MongoDB rodando no computador. O banco será criado automaticamente ao cadastrar dados.

Para MongoDB Atlas, troque apenas o `MONGO_URI` pela string do Atlas:

```env
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/tcc_seguranca_feminina
```

## O que foi integrado

- Tela de perfil agora tem login/cadastro conectado ao backend.
- Tela de novo relato envia dados para `/api/reports`.
- Tela de relatos lista dados reais do MongoDB.
- Tela de mapa mostra mapa real com OpenStreetMap/Leaflet e marcadores dos relatos.
- Tela de trajeto calcula rota com OSRM e manda para o backend pontuar a rota segura.

