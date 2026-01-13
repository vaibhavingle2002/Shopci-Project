const mysql = require('mysql2/promise');
require('dotenv').config();

async function fixProductDistribution() {
  try {
    console.log('🔧 Fixing product distribution across categories...');
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    // Update products to distribute across categories
    const updates = [
      { id: 1, category: 1 }, // Electronics
      { id: 2, category: 1 }, // Electronics
      { id: 3, category: 2 }, // Fashion
      { id: 4, category: 2 }, // Fashion
      { id: 5, category: 3 }, // Home & Kitchen
      { id: 6, category: 3 }, // Home & Kitchen
      { id: 7, category: 4 }, // Books
      { id: 8, category: 4 }, // Books
      { id: 9, category: 5 }, // Sports
      { id: 10, category: 5 } // Sports
    ];

    for (const update of updates) {
      await connection.query(
        'UPDATE products SET category_id = ? WHERE id = ?',
        [update.category, update.id]
      );
    }

    // Verify the distribution
    const [categories] = await connection.query('SELECT * FROM categories');
    console.log('📊 Updated product distribution:');
    
    for (const category of categories) {
      const [count] = await connection.query(
        'SELECT COUNT(*) as count FROM products WHERE category_id = ?',
        [category.id]
      );
      console.log(`   ${category.name}: ${count[0].count} products`);
    }

    console.log('✅ Product distribution fixed!');
    await connection.end();
  } catch (error) {
    console.error('❌ Error fixing product distribution:', error.message);
  }
}

fixProductDistribution();