const db = require('../models/db');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

class UserService {
  static async register(name, email, password) {
    if (db.users.find(u => u.email === email)) {
      throw new Error('Email já cadastrado');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User(uuidv4(), name, email, passwordHash);
    db.users.push(user);
    return user;
  }

  static async authenticate(email, password) {
    const user = db.users.find(u => u.email === email);
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.passwordHash);
    return valid ? user : null;
  }

  static getById(id) {
    return db.users.find(u => u.id === id);
  }
}

module.exports = UserService;

