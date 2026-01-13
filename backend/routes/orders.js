const express = require('express');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create order
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { items, total_amount, shipping_address } = req.body;

    // Create order
    const [orderResult] = await db.execute(
      'INSERT INTO orders (user_id, total_amount, shipping_address) VALUES (?, ?, ?)',
      [req.user.userId, total_amount, shipping_address]
    );

    const orderId = orderResult.insertId;

    // Add order items
    for (const item of items) {
      await db.execute(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    // Clear cart
    await db.execute('DELETE FROM cart WHERE user_id = ?', [req.user.userId]);

    res.status(201).json({ message: 'Order created successfully', orderId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user orders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [orders] = await db.execute(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.userId]
    );

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get order details
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const [orders] = await db.execute(
      'SELECT * FROM orders WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.userId]
    );

    if (orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const [orderItems] = await db.execute(`
      SELECT oi.*, p.name, p.image 
      FROM order_items oi 
      JOIN products p ON oi.product_id = p.id 
      WHERE oi.order_id = ?
    `, [req.params.id]);

    res.json({ ...orders[0], items: orderItems });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Cancel order
router.put('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const [orders] = await db.execute(
      'SELECT * FROM orders WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.userId]
    );

    if (orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (orders[0].status !== 'pending') {
      return res.status(400).json({ message: 'Only pending orders can be cancelled' });
    }

    await db.execute(
      'UPDATE orders SET status = "cancelled" WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.userId]
    );

    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;