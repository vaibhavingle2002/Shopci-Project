const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  console.log('Testing MySQL connection...');
  console.log('Host:', process.env.DB_HOST);
  console.log('User:', process.env.DB_USER);
  console.log('Password:', process.env.DB_PASSWORD ? '***' : 'EMPTY');
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: 3306
    });
    
    console.log('✅ MySQL connection successful!');
    await connection.end();
    
    // Now try to create database
    console.log('Creating database...');
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: 3306
    });
    
    await conn.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log('✅ Database created successfully!');
    await conn.end();
    
  } catch (error) {
    console.log('❌ Connection failed:');
    console.log('Error code:', error.code);
    console.log('Error message:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n🔧 Troubleshooting steps:');
      console.log('1. Make sure MySQL Server is running');
      console.log('2. Check if MySQL is running on port 3306');
      console.log('3. Verify your username and password');
      console.log('4. Try connecting with MySQL Workbench first');
    }
  }
}

testConnection();