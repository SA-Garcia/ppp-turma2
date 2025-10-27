const express = require('express');
const userRoutes = require('./routes/userRoutes');
const officialRoutes = require('./routes/officialRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../resources/swagger.json');

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/officials', officialRoutes);
app.use('/api/incidents', incidentRoutes);

// Swagger endpoint
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('API Segurança Pública - Incidentes');
});

module.exports = app;
