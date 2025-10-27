const db = require('../models/db');
const Incident = require('../models/incident');
const { v4: uuidv4 } = require('uuid');

const INCIDENT_TYPES = [
  'Roubo / Furto',
  'Agressão / Lesão corporal',
  'Crime ambiental',
  'Acidente de trânsito',
  'Suspeita / Comportamento estranho',
  'Importunação / Crime sexual'
];

class IncidentService {
  static createIncident(type, description, latitude, longitude, reporterId) {
    if (!INCIDENT_TYPES.includes(type)) {
      throw new Error('Tipo de ocorrência inválido');
    }
    const incident = new Incident(
      uuidv4(),
      type,
      description,
      latitude,
      longitude,
      reporterId,
      'aberto',
      new Date()
    );
    db.incidents.push(incident);
    return incident;
  }

  static updateStatus(id, status, user) {
    const incident = db.incidents.find(i => i.id === id);
    if (!incident) return null;
    if (!user || user.role !== 'official') {
      throw new Error('Apenas servidor público pode alterar o status');
    }
    if (!['em andamento', 'finalizado'].includes(status)) {
      throw new Error('Status inválido');
    }
    incident.status = status;
    return incident;
  }

  static getAll() {
    return db.incidents;
  }

  static getById(id) {
    return db.incidents.find(i => i.id === id);
  }
}

module.exports = { IncidentService, INCIDENT_TYPES };

