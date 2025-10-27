// User model (cidadão)
class User {
  constructor(id, name, email, passwordHash) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = 'user';
  }
}

module.exports = User;
