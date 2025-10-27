// Official (Servidor Público) model
class Official {
  constructor(id, name, email, passwordHash, org) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.org = org;
    this.role = 'official';
  }
}

module.exports = Official;
