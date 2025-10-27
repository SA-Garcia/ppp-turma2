const db = require('../models/db');
const Official = require('../models/official');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

class OfficialService {
  static async register(name, email, password, org) {
    if (db.officials.find(o => o.email === email)) {
      throw new Error('Email já cadastrado para servidor público');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const official = new Official(uuidv4(), name, email, passwordHash, org);
    db.officials.push(official);
    return official;
  }

  static async authenticate(email, password) {
    const official = db.officials.find(o => o.email === email);
    if (!official) return null;
    const valid = await bcrypt.compare(password, official.passwordHash);
    return valid ? official : null;
  }

  static getById(id) {
    return db.officials.find(o => o.id === id);
  }
}

module.exports = OfficialService;
