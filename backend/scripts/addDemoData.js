const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function addDemoData() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    // Add demo users
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    await connection.query(`
      INSERT IGNORE INTO users (id, name, email, password, phone, address) VALUES
      (1, 'John Doe', 'john@example.com', ?, '+1234567890', '123 Main St, New York, NY 10001'),
      (2, 'Jane Smith', 'jane@example.com', ?, '+1234567891', '456 Oak Ave, Los Angeles, CA 90001'),
      (3, 'Mike Johnson', 'mike@example.com', ?, '+1234567892', '789 Pine Rd, Chicago, IL 60601'),
      (4, 'Sarah Wilson', 'sarah@example.com', ?, '+1234567893', '321 Elm St, Houston, TX 77001'),
      (5, 'Admin User', 'admin@flipmart.com', ?, '+1234567894', 'FlipMart HQ, Seattle, WA 98101')
    `, [hashedPassword, hashedPassword, hashedPassword, hashedPassword, hashedPassword]);

    // Add demo orders
    await connection.query(`
      INSERT IGNORE INTO orders (id, user_id, total_amount, status, shipping_address, created_at) VALUES
      (1, 1, 1299.98, 'delivered', '123 Main St, New York, NY 10001', '2024-01-15 10:30:00'),
      (2, 2, 189.98, 'shipped', '456 Oak Ave, Los Angeles, CA 90001', '2024-01-16 14:20:00'),
      (3, 3, 999.99, 'processing', '789 Pine Rd, Chicago, IL 60601', '2024-01-17 09:15:00'),
      (4, 1, 59.99, 'delivered', '123 Main St, New York, NY 10001', '2024-01-18 16:45:00'),
      (5, 4, 349.99, 'pending', '321 Elm St, Houston, TX 77001', '2024-01-19 11:30:00'),
      (6, 2, 129.99, 'delivered', '456 Oak Ave, Los Angeles, CA 90001', '2024-01-20 13:20:00'),
      (7, 3, 649.99, 'shipped', '789 Pine Rd, Chicago, IL 60601', '2024-01-21 15:10:00')
    `);

    // Add demo order items
    await connection.query(`
      INSERT IGNORE INTO order_items (order_id, product_id, quantity, price) VALUES
      (1, 1, 1, 999.99), (1, 3, 1, 299.99),
      (2, 5, 1, 129.99), (2, 9, 1, 59.99),
      (3, 1, 1, 999.99),
      (4, 6, 1, 59.99),
      (5, 4, 1, 349.99),
      (6, 5, 1, 129.99),
      (7, 8, 1, 649.99)
    `);

    // Add more products
    await connection.query(`
      INSERT IGNORE INTO products (id, name, description, price, original_price, discount_percentage, category_id, brand, stock_quantity, image, rating, reviews_count) VALUES
      (11, 'iPad Air', 'Powerful tablet with M1 chip', 599.99, 699.99, 14, 1, 'Apple', 45, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', 4.4, 890),
      (12, 'AirPods Pro', 'Active noise cancellation earbuds', 249.99, 279.99, 11, 1, 'Apple', 120, 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop', 4.6, 1200),
      (13, 'Adidas Ultraboost', 'Premium running shoes', 179.99, 199.99, 10, 2, 'Adidas', 80, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', 4.5, 650),
      (14, 'Zara Jacket', 'Stylish winter jacket', 89.99, 119.99, 25, 2, 'Zara', 60, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop', 4.2, 340),
      (15, 'Instant Pot', 'Multi-use pressure cooker', 79.99, 99.99, 20, 3, 'Instant Pot', 35, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', 4.7, 2100)
    `);

    console.log('Demo data added successfully!');
    await connection.end();
  } catch (error) {
    console.error('Error adding demo data:', error);
  }
}

addDemoData();