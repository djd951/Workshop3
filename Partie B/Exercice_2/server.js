const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const productsRoutes = require('./productsRoutes'); // Import des routes pour les produits

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'ecommerce_db';

let db;

MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');
  db = client.db(dbName);
});

app.use(bodyParser.json());

// Endpoint for getting all products
app.use('/products', productsRoutes); // Utilisation des routes pour les produits

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

