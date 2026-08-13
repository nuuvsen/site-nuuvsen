# Nuuvsen — Site + Painel Admin + Área de Clientes

Aplicação React (Vite + Tailwind CSS + React Router) com três frentes:

1. **Site público** (`/`) — `HomePage.jsx`
2. **Painel administrativo** (`/admin`) — protegido por login, sidebar retrátil
3. **Área de clientes** (`/portal`) — cadastro/login para quem contrata serviços

## ⚠️ Antes de tudo: leia isto

Todo o cadastro de usuários (admin e clientes) hoje funciona com
`localStorage`, guardado só no navegador de quem está usando. Isso serve
para validar a interface, mas **tem limitações sérias**:

- Senha fica salva em texto puro no navegador — não é seguro.
- Cada navegador/dispositivo tem seus próprios dados — não sincroniza entre
  pessoas nem entre computadores.
- Ao limpar o cache do navegador, os cadastros somem.

Para produção, os pontos abaixo precisam de um backend real (API +
banco de dados):

| Área | O que falta |
|---|---|
| `AdminAuthContext.jsx` / `ClientAuthContext.jsx` | Autenticação real, senha com hash (bcrypt/argon2), sessão/JWT |
| Página **Cloud** | Backend que fale com a API do Nextcloud (OCS/WebDAV) — não dá para chamar direto do navegador com credenciais de admin |
| Página **Mensagens → WhatsApp** | Backend com a API oficial do WhatsApp Business (Meta Cloud API) ou um gateway próprio — não existe "conectar WhatsApp" só no front-end |
| Página **Mensagens → Telegram** | Já funciona de verdade — o `Bot.jsx` fala direto com a API do Telegram. Só atenção: o token fica exposto no navegador (veja aviso dentro do próprio componente) |
| Planos (Nextcloud / e-mail) | Hoje só registra "pedido" localmente. Cobrança e provisionamento real precisam de backend + gateway de pagamento |

Nada disso te impede de usar o painel hoje para desenhar o fluxo, testar a
navegação e mostrar para o time — só não cadastre usuários/clientes reais
até plugar o backend.

## Estrutura

```
nuuvsen-app/
├── src/
│   ├── pages/
│   │   └── HomePage.jsx              # site público
│   ├── admin/
│   │   ├── AdminLogin.jsx            # login / primeiro acesso
│   │   ├── AdminLayout.jsx           # sidebar + topo do painel
│   │   ├── RequireAdmin.jsx          # protege as rotas /admin/*
│   │   └── pages/
│   │       ├── Home.jsx              # visão geral / métricas
│   │       ├── Cloud.jsx             # rascunho da conexão Nextcloud
│   │       ├── Usuarios.jsx          # gestão de acesso ao painel
│   │       ├── Clientes.jsx          # contas cadastradas no site
│   │       ├── Mensagens.jsx         # Telegram + WhatsApp
│   │       ├── EditarPaginaClientes.jsx
│   │       └── Configuracoes.jsx
│   ├── portal/
│   │   ├── PortalLogin.jsx           # cadastro/login do cliente
│   │   ├── PortalLayout.jsx
│   │   └── PortalHome.jsx            # arquivos, downloads, planos
│   ├── components/
│   │   └── Bot.jsx                   # teste de envio via Telegram
│   ├── context/
│   │   ├── AdminAuthContext.jsx
│   │   ├── ClientAuthContext.jsx
│   │   └── ConteudoContext.jsx       # conteúdo editável da área de clientes
│   ├── App.jsx
│   ├── routes.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
├── Dockerfile
├── nginx.conf
├── docker-compose.yml
└── .dockerignore
```

## Rotas

| Rota | O que é |
|---|---|
| `/` | Site institucional público |
| `/admin/login` | Login do painel — na primeira vez, cria a conta de administrador |
| `/admin` | Dashboard (Home) |
| `/admin/cloud` | Configuração do Nextcloud |
| `/admin/usuarios` | Gestão de usuários do painel |
| `/admin/clientes` | Lista de clientes cadastrados |
| `/admin/mensagens` | Telegram + WhatsApp |
| `/admin/editar-pagina` | Editor do conteúdo da área de clientes |
| `/admin/configuracoes` | Configurações gerais |
| `/portal/login` | Cadastro/login do cliente |
| `/portal` | Área do cliente — arquivos, downloads, planos |

## Rodando localmente (desenvolvimento)

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`. Vá em `/admin/login` para criar seu
primeiro acesso de administrador.

## Build de produção manual

```bash
npm install
npm run build
npm run preview
```

## Deploy via Docker / Portainer

### Opção 1 — Docker Compose (Stack no Portainer)

1. No Portainer, **Stacks → Add stack**.
2. **Repository** apontando para o seu Git, ou **Web editor** colando o
   `docker-compose.yml`.
3. Deploy. Ele builda a imagem `nuuvsen-app:latest` e sobe o container
   `nuuvsen-app` publicando a porta `8080` do host.
4. Acesse `http://SEU_HOST:8080`.

Se a porta `8080` já estiver em uso no host, troque `"8080:80"` por outra
porta livre no `docker-compose.yml` antes do deploy.

### Opção 2 — Build manual

```bash
docker build -t nuuvsen-app:latest .
docker run -d --name nuuvsen-app -p 8080:80 --restart unless-stopped nuuvsen-app:latest
```

## Próximos passos sugeridos

1. Subir um backend (Node/Express, Python/FastAPI, etc.) com banco de dados
   para usuários e clientes, e trocar as chamadas dentro de
   `AdminAuthContext.jsx` e `ClientAuthContext.jsx` por chamadas HTTP a
   esse backend.
2. Criar um endpoint no backend que fale com o Nextcloud (OCS API) para
   provisionar espaço quando um cliente contratar o plano.
3. Decidir entre WhatsApp Cloud API (oficial, estável) ou um gateway
   próprio para o WhatsApp, e então implementar o fluxo real de QR code /
   token na página **Mensagens**.
4. Adicionar um gateway de pagamento para os planos (Nextcloud, e-mail
   Carbonio, futuros) antes de deixar "Quero contratar" virar cobrança de
   verdade.
