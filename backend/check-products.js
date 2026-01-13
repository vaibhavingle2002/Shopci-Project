const db = require('./config/database');

async function checkProducts() {
  try {
    const [products] = await db.execute('SELECT COUNT(*) as count FROM products');
    console.log('Total products in database:', products[0].count);
    
    if (products[0].count > 0) {
      const [allProducts] = await db.execute('SELECT id, name, price FROM products LIMIT 5');
      console.log('Sample products:');
      allProducts.forEach(p => console.log(`- ${p.id}: ${p.name} - $${p.price}`));
    }
  } catch (error) {
    console.error('Error checking products:', error);
  }
  process.exit(0);
}

checkProducts();