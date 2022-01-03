const express      = require ('express');
const mongoose     = require('mongoose');
const userRoutes   = require('./routes/user');
const saucesRoutes = require('./routes/sauce');
const path         = require('path');
const helmet       = require('helmet');
require('dotenv').config()

mongoose
  .connect(
    process.env.Mongo_DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
  
  const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
  });
app.use(express.json());
app.use(helmet());

app.use('/api/auth/', userRoutes);
app.use('/api/sauces', saucesRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app