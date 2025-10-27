const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');
const { authMiddleware, onlyOfficial } = require('../middleware/auth');

router.get('/types', incidentController.getTypes);
router.post('/', authMiddleware, incidentController.create); // cidadão
router.get('/', authMiddleware, incidentController.list);
router.get('/:id', authMiddleware, incidentController.getById);
router.patch('/:id/status', authMiddleware, onlyOfficial, incidentController.updateStatus); // só servidor público

module.exports = router;
