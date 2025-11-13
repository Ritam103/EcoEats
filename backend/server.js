// server.js - EcoEats Backend Starter
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Simple in-memory demo store (replace with DB later)
const demo = {
  users: [],
  orders: []
};

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running', time: new Date().toISOString() });
});

// Root
app.get('/', (req, res) => {
  res.send('EcoEats Backend API - Hello!');
});

// Simple demo register (no hashing here - demo only)
app.post('/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email & password required' });
  const exists = demo.users.find(u => u.email === email);
  if (exists) return res.status(400).json({ error: 'user exists' });
  demo.users.push({ id: demo.users.length + 1, name, email, password: '***' });
  return res.json({ message: 'registered (demo only)' });
});

// Create order (demo)
app.post('/orders/create', (req, res) => {
  const { userId, restaurantId, items, distance_km } = req.body;
  if (!userId || !items) return res.status(400).json({ error: 'userId and items required' });
  const order = { id: demo.orders.length + 1, userId, restaurantId, items, distance_km, status: 'created' };
  demo.orders.push(order);
  return res.json({ message: 'order created (demo)', order });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`EcoEats backend listening on port ${PORT}`));

