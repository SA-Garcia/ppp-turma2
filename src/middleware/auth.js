const jwt = require('jsonwebtoken');
const UserService = require('../services/userService');
const OfficialService = require('../services/officialService');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token inválido' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    let user = null;
    if (decoded.role === 'official') {
      user = OfficialService.getById(decoded.id);
    } else {
      user = UserService.getById(decoded.id);
    }
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });
    req.user = user;
    req.user.role = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
}

function onlyOfficial(req, res, next) {
  if (req.user && req.user.role === 'official') {
    return next();
  }
  return res.status(403).json({ error: 'Acesso restrito a servidor público' });
}

module.exports = { authMiddleware, onlyOfficial };
