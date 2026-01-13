const db = require('./config/database');
const bcrypt = require('bcryptjs');

async function createCustomAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('admin@123', 10);
    
    await db.execute(
      'INSERT IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      ['Admin', 'admin@123', hashedPassword, 'admin']
    );
    
    console.log('Custom admin user created!');
    console.log('Email: admin@123');
    console.log('Password: admin@123');
  } catch (error) {
    console.error('Error:', error);
  }
  process.exit(0);
}

createCustomAdmin();