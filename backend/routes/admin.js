const express = require('express');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Admin middleware
const isAdmin = (req, res, next) => {
  next();
};

// Get all products for admin
router.get('/products', authenticateToken, isAdmin, async (req, res) => {
  try {
    const [products] = await db.execute(`
      SELECT p.*, c.name as category_name
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      ORDER BY p.created_at DESC
    `);
    res.json(products);
  } catch (error) {
    console.error('Admin products Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add new product
router.post('/products', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, description, price, original_price, category_id, brand, stock_quantity, image } = req.body;
    
    const discount_percentage = original_price ? Math.round(((original_price - price) / original_price) * 100) : 0;
    
    const [result] = await db.execute(
      'INSERT INTO products (name, description, price, original_price, discount_percentage, category_id, brand, stock_quantity, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, description, price, original_price, discount_percentage, category_id, brand, stock_quantity, image]
    );

    res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
  } catch (error) {
    console.error('Add product Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update product
router.put('/products/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, description, price, original_price, category_id, brand, stock_quantity, image } = req.body;
    
    const discount_percentage = original_price ? Math.round(((original_price - price) / original_price) * 100) : 0;
    
    await db.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, original_price = ?, discount_percentage = ?, category_id = ?, brand = ?, stock_quantity = ?, image = ? WHERE id = ?',
      [name, description, price, original_price, discount_percentage, category_id, brand, stock_quantity, image, parseInt(req.params.id)]
    );

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Update product Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete product
router.delete('/products/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    await db.execute('DELETE FROM products WHERE id = ?', [parseInt(req.params.id)]);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get dashboard analytics
router.get('/analytics', authenticateToken, isAdmin, async (req, res) => {
  try {
    const [totalProducts] = await db.execute('SELECT COUNT(*) as count FROM products');
    const [totalOrders] = await db.execute('SELECT COUNT(*) as count FROM orders');
    const [totalUsers] = await db.execute('SELECT COUNT(*) as count FROM users');
    const [totalRevenue] = await db.execute('SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status != "cancelled"');
    
    const [recentOrders] = await db.execute(`
      SELECT o.*, u.name as user_name 
      FROM orders o 
      JOIN users u ON o.user_id = u.id 
      ORDER BY o.created_at DESC 
      LIMIT 10
    `);

    const [topProducts] = await db.execute(`
      SELECT p.name, p.image, 0 as total_sold, 0 as revenue
      FROM products p
      ORDER BY p.rating DESC
      LIMIT 5
    `);

    res.json({
      stats: {
        totalProducts: totalProducts[0].count,
        totalOrders: totalOrders[0].count,
        totalUsers: totalUsers[0].count,
        totalRevenue: totalRevenue[0].total || 0
      },
      recentOrders,
      topProducts
    });
  } catch (error) {
    console.error('Analytics Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all orders for admin
router.get('/orders', authenticateToken, isAdmin, async (req, res) => {
  try {
    const [orders] = await db.execute(`
      SELECT o.*, u.name as user_name, u.email as user_email
      FROM orders o 
      JOIN users u ON o.user_id = u.id 
      ORDER BY o.created_at DESC
    `);
    res.json(orders);
  } catch (error) {
    console.error('Admin orders Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status
router.put('/orders/:id/status', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    await db.execute('UPDATE orders SET status = ? WHERE id = ?', [status, parseInt(req.params.id)]);
    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Update order status Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;