const mysql = require('mysql2/promise');
require('dotenv').config();

async function testAPI() {
  try {
    console.log('🔍 Testing FlipMart API...');
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    // Test products
    const [products] = await connection.query('SELECT COUNT(*) as count FROM products');
    console.log(`📦 Products in DB: ${products[0].count}`);

    // Test categories
    const [categories] = await connection.query('SELECT * FROM categories');
    console.log(`📂 Categories: ${categories.length}`);
    categories.forEach(cat => console.log(`   - ${cat.name} (ID: ${cat.id})`));

    // Test products by category
    for (const category of categories) {
      const [catProducts] = await connection.query('SELECT COUNT(*) as count FROM products WHERE category_id = ?', [category.id]);
      console.log(`   📦 ${category.name}: ${catProducts[0].count} products`);
    }

    // Test users
    const [users] = await connection.query('SELECT COUNT(*) as count FROM users');
    console.log(`👥 Users: ${users[0].count}`);

    // Test orders
    const [orders] = await connection.query('SELECT COUNT(*) as count FROM orders');
    console.log(`🛒 Orders: ${orders[0].count}`);

    console.log('✅ Database is properly set up!');
    await connection.end();
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
  }
}

testAPI();