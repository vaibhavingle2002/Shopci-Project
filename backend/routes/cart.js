const express = require('express');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get cart items
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [cartItems] = await db.execute(`
      SELECT c.*, p.name, p.price, p.image, p.stock_quantity 
      FROM cart c 
      JOIN products p ON c.product_id = p.id 
      WHERE c.user_id = ?
    `, [req.user.userId]);

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add to cart
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;

    // Check if item already exists in cart
    const [existing] = await db.execute(
      'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
      [req.user.userId, product_id]
    );

    if (existing.length > 0) {
      // Update quantity
      await db.execute(
        'UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
        [quantity, req.user.userId, product_id]
      );
    } else {
      // Add new item
      await db.execute(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [req.user.userId, product_id, quantity]
      );
    }

    res.json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update cart item quantity
router.put('/update/:id', authenticateToken, async (req, res) => {
  try {
    const { quantity } = req.body;
    
    await db.execute(
      'UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?',
      [quantity, req.params.id, req.user.userId]
    );

    res.json({ message: 'Cart updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove from cart
router.delete('/remove/:id', authenticateToken, async (req, res) => {
  try {
    await db.execute(
      'DELETE FROM cart WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.userId]
    );

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;