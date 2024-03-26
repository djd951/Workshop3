// productsRoutes.js
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

// Endpoint for getting a product by ID
router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await req.db.collection('products').findOne({ _id: ObjectId(productId) });

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});

// Endpoint for adding a new product
router.post('/', async (req, res) => {
  const newProduct = req.body;
  const result = await req.db.collection('products').insertOne(newProduct);
  const insertedProduct = await req.db.collection('products').findOne({ _id: result.insertedId });
  res.status(201).json(insertedProduct);
});

// Endpoint for updating a product
router.put('/:id', async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  const result = await req.db.collection('products').updateOne({ _id: ObjectId(productId) }, { $set: updatedProduct });

  if (result.matchedCount === 0) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(updatedProduct);
});

// Endpoint for deleting a product
router.delete('/:id', async (req, res) => {
  const productId = req.params.id;
  const result = await req.db.collection('products').deleteOne({ _id: ObjectId(productId) });

  if (result.deletedCount === 0) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json({ message: 'Product deleted' });
});

module.exports = router;
