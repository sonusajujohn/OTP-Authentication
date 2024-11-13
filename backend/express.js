require('dotenv').config();
const express = require('express');
const cors = require('cors');
const otpRoutes = require('./route/otproutes');

const app = express();
app.use(express.json());
app.use(cors());

require('./db/connection');
app.use('/api', otpRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


