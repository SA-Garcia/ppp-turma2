// Incident model
class Incident {
  constructor(id, type, description, latitude, longitude, reporterId, status, createdAt) {
    this.id = id;
    this.type = type;
    this.description = description;
    this.latitude = latitude;
    this.longitude = longitude;
    this.reporterIds = reporterId ? [reporterId] : [];
    this.status = status || 'aberto';
    this.createdAt = createdAt || new Date();
  }
}

module.exports = Incident;

