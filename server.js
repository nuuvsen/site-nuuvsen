import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import publicRoutes from './routes/publicRoutes.js';

const app = express();
export const prisma = new PrismaClient();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Rotas públicas (HomePage, envio de formulários)
app.use('/api/public', publicRoutes);

// Rotas de Autenticação (Login Admin e Login Portal Cliente)
app.use('/api/auth', authRoutes);

// Rotas Administrativas (Protegidas por JWT Admin)
app.use('/api/admin', adminRoutes);

// Rotas do Portal do Cliente (Protegidas por JWT Cliente)
app.use('/api/client', clientRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor Nuuvsen Backend rodando na porta ${PORT}`);
});