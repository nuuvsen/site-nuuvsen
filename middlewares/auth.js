import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'nuuvsen_super_secret_key';

export const verifyToken = (requiredRole?: 'ADMIN' | 'CLIENTE') => {
  return (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

    const token = authHeader.split(' ')[1];

    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      req.user = decoded;

      if (requiredRole && decoded.role !== requiredRole && decoded.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Acesso não autorizado para esta regra.' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
  };
};