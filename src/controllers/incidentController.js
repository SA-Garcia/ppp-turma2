const { IncidentService, INCIDENT_TYPES } = require('../services/incidentService');

module.exports = {
  create(req, res) {
    try {
      const { type, description, latitude, longitude } = req.body;
      const reporterId = req.user.id;
      const incident = IncidentService.createIncident(type, description, latitude, longitude, reporterId);
      res.status(201).json(incident);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  updateStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const incident = IncidentService.updateStatus(id, status, req.user);
      if (!incident) {
        return res.status(404).json({ error: 'Ocorrência não encontrada' });
      }
      // Não retorna nome do servidor público
      res.json({
        id: incident.id,
        type: incident.type,
        description: incident.description,
        latitude: incident.latitude,
        longitude: incident.longitude,
        reporterIds: incident.reporterIds,
        status: incident.status,
        createdAt: incident.createdAt
      });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  list(req, res) {
    res.json(IncidentService.getAll());
  },

  getById(req, res) {
    const { id } = req.params;
    const incident = IncidentService.getById(id);
    if (!incident) {
      return res.status(404).json({ error: 'Ocorrência não encontrada' });
    }
    res.json(incident);
  },

  getTypes(req, res) {
    res.json(INCIDENT_TYPES);
  }
};
