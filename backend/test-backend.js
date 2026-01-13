const db = require('./config/database');

async function testBackend() {
  try {
    console.log('Testing database connection...');
    const [result] = await db.execute('SELECT COUNT(*) as count FROM products');
    console.log('✅ Database connected. Products count:', result[0].count);
    
    console.log('✅ Backend is working properly');
  } catch (error) {
    console.error('❌ Backend error:', error.message);
  }
  process.exit(0);
}

testBackend();