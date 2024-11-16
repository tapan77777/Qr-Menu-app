const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const menuItemsRoutes = require('./routes/menuItems');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/menu-items', menuItemsRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
