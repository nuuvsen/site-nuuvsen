import { Router } from 'express';
import { prisma } from '../server.js';
import { verifyToken } from '../middlewares/auth.js';
import axios from 'axios';

const router = Router();
router.use(verifyToken('ADMIN')); // Protege todas as rotas abaixo

// --- MENSAGENS / LEADS ---
router.get('/mensagens', async (req, res) => {
  const mensagens = await prisma.mensagem.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(mensagens);
});

router.patch('/mensagens/:id/status', async (req, res) => {
  const { status } = req.body;
  const updated = await prisma.mensagem.update({
    where: { id: req.params.id },
    data: { status }
  });
  res.json(updated);
});

// --- CLIENTES & USUÁRIOS ---
router.get('/usuarios', async (req, res) => {
  const users = await prisma.user.findMany({ select: { id: true, nome: true, email: true, role: true, empresa: true, ativo: true } });
  res.json(users);
});

// --- EDITAR PÁGINA / CONTEÚDO SITE ---
router.post('/conteudo', async (req, res) => {
  const { heroTitle, heroSub, servicos } = req.body;
  const updated = await prisma.conteudoSite.upsert({
    where: { id: 'global' },
    update: { heroTitle, heroSub, servicos },
    create: { id: 'global', heroTitle, heroSub, servicos }
  });
  res.json(updated);
});

// --- CONFIGURAÇÕES & BOT TELEGRAM (Gerenciado em Bot.jsx / Configuracoes.jsx) ---
router.get('/configuracoes', async (req, res) => {
  const config = await prisma.configIntegracao.findUnique({ where: { id: 'global' } });
  res.json(config || {});
});

router.post('/configuracoes/telegram', async (req, res) => {
  const { telegramToken, telegramChatId } = req.body;

  const config = await prisma.configIntegracao.upsert({
    where: { id: 'global' },
    update: { telegramToken, telegramChatId },
    create: { id: 'global', telegramToken, telegramChatId }
  });

  res.json({ success: true, config });
});

// Rota de Teste do Bot (Disparada pelo componente Bot.jsx)
router.post('/configuracoes/telegram/teste', async (req, res) => {
  const { telegramToken, telegramChatId } = req.body;

  try {
    await axios.post(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      chat_id: telegramChatId,
      text: '🤖 *Nuuvsen Platform*: Teste de integração do Bot realizado com sucesso!',
      parse_mode: 'Markdown'
    });
    res.json({ success: true, message: 'Mensagem de teste enviada com sucesso!' });
  } catch (error: any) {
    res.status(400).json({ error: 'Falha ao enviar mensagem no Telegram. Verifique Token e Chat ID.' });
  }
});

export default router;