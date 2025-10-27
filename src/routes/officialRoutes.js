const express = require('express');
const router = express.Router();
const officialController = require('../controllers/officialController');
const { authMiddleware, onlyOfficial } = require('../middleware/auth');

router.post('/register', officialController.register);
router.post('/login', officialController.login);
// Apenas servidor público autenticado pode visualizar cadastro de outro servidor
router.get('/:id', authMiddleware, onlyOfficial, officialController.getPublicInfo);

module.exports = router;
