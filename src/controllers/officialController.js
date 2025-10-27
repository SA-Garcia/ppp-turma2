const OfficialService = require('../services/officialService');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

module.exports = {
  async register(req, res) {
    try {
      const { name, email, password, org } = req.body;
      const official = await OfficialService.register(name, email, password, org);
      res.status(201).json({ id: official.id, name: official.name, email: official.email, org: official.org, role: 'official' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    const official = await OfficialService.authenticate(email, password);
    if (!official) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ id: official.id, email: official.email, role: 'official' }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  },

  /**
   * Visualização restrita: apenas servidor público autenticado pode ver dados básicos de outro servidor
   * Retorna apenas id e org do servidor consultado
   */
  getPublicInfo(req, res) {
    const { id } = req.params;
    // req.user é preenchido pelo middleware de autenticação e onlyOfficial
    if (!req.user || req.user.role !== 'official') {
      return res.status(403).json({ error: 'Acesso restrito a servidor público' });
    }
    const official = OfficialService.getById(id);
    if (!official) {
      return res.status(404).json({ error: 'Servidor público não encontrado' });
    }
    // Não retorna nome, email ou senha
    res.json({ id: official.id, org: official.org });
  }
};
