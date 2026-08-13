import { Router } from 'express';
import { prisma } from '../server.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'nuuvsen_super_secret_key';

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.ativo) {
    return res.status(401).json({ error: 'Credenciais inválidas ou usuário inativo.' });
  }

  const validPassword = await bcrypt.compare(senha, user.senhaHash);
  if (!validPassword) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, nome: user.nome },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    token,
    user: { id: user.id, nome: user.nome, email: user.email, role: user.role, empresa: user.empresa }
  });
});

export default router;