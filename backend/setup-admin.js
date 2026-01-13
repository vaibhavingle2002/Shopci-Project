const db = require('./config/database');
const bcrypt = require('bcryptjs');

async function setupAdminUser() {
  try {
    // Add role column to users table if it doesn't exist
    try {
      await db.execute(`ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'user'`);
    } catch (error) {
      // Column might already exist, ignore error
    }
    
    // Create admin user with specified credentials
    const hashedPassword = await bcrypt.hash('1234', 10);
    
    await db.execute(`
      INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE password = ?, role = ?
    `, ['Admin User', 'admin@123', hashedPassword, 'admin', hashedPassword, 'admin']);
    
    console.log('Admin user created successfully!');
    console.log('Email: admin@123');
    console.log('Password: 1234');
    console.log('Role: admin');
    
  } catch (error) {
    console.error('Error setting up admin user:', error);
  }
  process.exit(0);
}

setupAdminUser();