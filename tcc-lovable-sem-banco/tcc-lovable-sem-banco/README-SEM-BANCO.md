# Versão sem banco de dados

Esta versão é apenas para visualizar e testar a interface.

Ela não usa MongoDB e não precisa rodar backend.  
Os dados ficam salvos temporariamente no `localStorage` do navegador.

## Como rodar

Na pasta do projeto:

```bash
npm install
npm run dev
```

Depois acesse:

```txt
http://localhost:5173
```

## Login de teste

Pode entrar com qualquer e-mail e senha.

Exemplo:

```txt
E-mail: teste@email.com
Senha: 123456
```

## O que funciona nessa versão

- Visualizar a interface.
- Fazer login/cadastro falso.
- Ver relatos de exemplo.
- Criar novos relatos.
- Ver relatos no mapa.
- Confirmar relatos.
- Planejar rota usando OpenStreetMap/OSRM.
- Salvar dados no navegador.

## Importante

Quando limpar o cache/localStorage do navegador, os relatos criados somem.  
A versão com MongoDB deve ser usada depois para persistir dados reais.
