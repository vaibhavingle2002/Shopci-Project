const db = require('./config/database');
const bcrypt = require('bcryptjs');

async function createDemoUsers() {
  try {
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    await db.execute(
      'INSERT IGNORE INTO users (name, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, ?)',
      ['John Doe', 'user@example.com', hashedPassword, '1234567890', '123 Main St', 'user']
    );
    
    await db.execute(
      'INSERT IGNORE INTO users (name, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, ?)',
      ['Test User', 'test@test.com', hashedPassword, '0987654321', '456 Oak Ave', 'user']
    );
    
    console.log('Demo users created!');
    console.log('User 1 - Email: user@example.com, Password: 123456');
    console.log('User 2 - Email: test@test.com, Password: 123456');
  } catch (error) {
    console.error('Error:', error);
  }
  process.exit(0);
}

createDemoUsers();