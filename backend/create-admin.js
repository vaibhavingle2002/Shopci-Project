const db = require('./config/database');
const bcrypt = require('bcryptjs');

async function createAdminUser() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await db.execute(
      'INSERT IGNORE INTO users (name, email, password) VALUES (?, ?, ?)',
      ['Admin User', 'admin@example.com', hashedPassword]
    );
    
    console.log('Admin user created successfully!');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
  process.exit(0);
}

createAdminUser();