const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function setupCompleteData() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('🔄 Setting up complete FlipMart data...');

    // Clear all existing data
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('TRUNCATE TABLE order_items');
    await connection.query('TRUNCATE TABLE orders');
    await connection.query('TRUNCATE TABLE cart');
    await connection.query('TRUNCATE TABLE products');
    await connection.query('TRUNCATE TABLE users');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    // Add demo users
    const hashedPassword = await bcrypt.hash('123456', 10);
    await connection.query(`
      INSERT INTO users (id, name, email, password, phone, address) VALUES
      (1, 'John Doe', 'john@example.com', ?, '+91-9876543210', '123 MG Road, Bangalore, Karnataka 560001'),
      (2, 'Priya Sharma', 'priya@example.com', ?, '+91-9876543211', '456 CP, New Delhi, Delhi 110001'),
      (3, 'Rahul Kumar', 'rahul@example.com', ?, '+91-9876543212', '789 Marine Drive, Mumbai, Maharashtra 400001'),
      (4, 'Sneha Patel', 'sneha@example.com', ?, '+91-9876543213', '321 Park Street, Kolkata, West Bengal 700016'),
      (5, 'Admin User', 'admin@flipkart.com', ?, '+91-9876543214', 'Flipkart HQ, Bangalore, Karnataka 560034')
    `, [hashedPassword, hashedPassword, hashedPassword, hashedPassword, hashedPassword]);

    // Add all 50 products (10 per category)
    
    // Electronics (Category 1)
    await connection.query(`
      INSERT INTO products (name, description, price, original_price, discount_percentage, category_id, brand, stock_quantity, image, rating, reviews_count) VALUES
      ('iPhone 15 Pro Max', 'Latest iPhone with A17 Pro chip, 256GB', 79999, 89999, 11, 1, 'Apple', 25, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop', 4.5, 1250),
      ('Samsung Galaxy S24 Ultra', 'Premium Android with S Pen, 512GB', 95999, 109999, 13, 1, 'Samsung', 30, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop', 4.4, 890),
      ('MacBook Air M3', 'Lightweight laptop, 13-inch, 16GB RAM', 103999, 119999, 13, 1, 'Apple', 15, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', 4.7, 2100),
      ('Sony WH-1000XM5', 'Noise cancelling headphones', 27999, 32999, 15, 1, 'Sony', 50, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', 4.6, 1500),
      ('iPad Pro 12.9 M2', 'Professional tablet, 256GB WiFi', 87999, 99999, 12, 1, 'Apple', 20, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', 4.5, 890),
      ('Dell XPS 13 Plus', 'Premium ultrabook, Intel i7', 79999, 94999, 16, 1, 'Dell', 12, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop', 4.3, 650),
      ('AirPods Pro 2nd Gen', 'Active noise cancellation', 19999, 22999, 13, 1, 'Apple', 60, 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop', 4.6, 1200),
      ('Samsung 55" Neo QLED', '4K Smart TV with Quantum HDR', 63999, 79999, 20, 1, 'Samsung', 8, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop', 4.4, 780),
      ('Nintendo Switch OLED', 'Gaming console with 7-inch OLED', 27999, 31999, 13, 1, 'Nintendo', 35, 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop', 4.5, 920),
      ('Canon EOS R6 Mark II', 'Full-frame mirrorless camera', 199999, 229999, 13, 1, 'Canon', 5, 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop', 4.7, 340)
    `);

    // Fashion (Category 2)
    await connection.query(`
      INSERT INTO products (name, description, price, original_price, discount_percentage, category_id, brand, stock_quantity, image, rating, reviews_count) VALUES
      ('Nike Air Max 270', 'Comfortable running shoes', 10399, 11999, 13, 2, 'Nike', 100, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', 4.4, 750),
      ('Adidas Ultraboost 22', 'Premium running shoes', 14399, 15999, 10, 2, 'Adidas', 80, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', 4.5, 650),
      ('Levi\'s 501 Original Jeans', 'Classic straight fit jeans', 4799, 5999, 20, 2, 'Levi\'s', 150, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop', 4.2, 1200),
      ('Zara Wool Overcoat', 'Premium winter coat', 11999, 15999, 25, 2, 'Zara', 40, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop', 4.3, 340),
      ('H&M Cotton T-Shirt', 'Basic crew neck t-shirt', 799, 1199, 33, 2, 'H&M', 200, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', 4.0, 890),
      ('Gucci Leather Handbag', 'Designer leather handbag', 103999, 119999, 13, 2, 'Gucci', 6, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop', 4.8, 120),
      ('Ray-Ban Aviator Classic', 'Iconic aviator sunglasses', 11999, 14399, 17, 2, 'Ray-Ban', 45, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', 4.6, 560),
      ('Converse Chuck Taylor All Star', 'Classic canvas sneakers', 4399, 5199, 15, 2, 'Converse', 90, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', 4.3, 780),
      ('Tommy Hilfiger Polo Shirt', 'Classic fit polo shirt', 3999, 5599, 29, 2, 'Tommy Hilfiger', 70, 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop', 4.2, 450),
      ('Puma Tracksuit Set', 'Complete tracksuit for men', 6399, 7999, 20, 2, 'Puma', 55, 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop', 4.1, 320)
    `);

    // Home & Kitchen (Category 3)
    await connection.query(`
      INSERT INTO products (name, description, price, original_price, discount_percentage, category_id, brand, stock_quantity, image, rating, reviews_count) VALUES
      ('KitchenAid Artisan Stand Mixer', '5-quart tilt-head stand mixer', 23999, 27999, 14, 3, 'KitchenAid', 15, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', 4.8, 3200),
      ('Dyson V15 Detect Absolute', 'Cordless vacuum cleaner', 51999, 59999, 13, 3, 'Dyson', 20, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', 4.5, 1800),
      ('Instant Pot Duo Plus 6Qt', '9-in-1 electric pressure cooker', 6399, 7999, 20, 3, 'Instant Pot', 80, 'https://images.unsplash.com/photo-1585515656643-1bb0ac2ec5ee?w=400&h=400&fit=crop', 4.7, 2100),
      ('Ninja Professional Blender', '1000W motor blender', 7999, 10399, 23, 3, 'Ninja', 40, 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=400&fit=crop', 4.4, 890),
      ('Breville Barista Express', 'Espresso machine with grinder', 31999, 39999, 20, 3, 'Breville', 10, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop', 4.6, 650),
      ('IKEA KIVIK 3-Seat Sofa', 'Modern sectional sofa', 47999, 63999, 25, 3, 'IKEA', 8, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', 4.2, 340),
      ('Philips HD9252 Air Fryer', 'Digital air fryer 4.1L', 11999, 15999, 25, 3, 'Philips', 30, 'https://images.unsplash.com/photo-1585515656643-1bb0ac2ec5ee?w=400&h=400&fit=crop', 4.5, 1200),
      ('Cuisinart Elemental 13-Cup', 'Food processor with accessories', 15999, 19999, 20, 3, 'Cuisinart', 18, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', 4.3, 780),
      ('Lodge Cast Iron Skillet 12"', 'Pre-seasoned cast iron pan', 2799, 3599, 22, 3, 'Lodge', 100, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', 4.7, 1500),
      ('iRobot Roomba j7+', 'Self-emptying robot vacuum', 31999, 39999, 20, 3, 'iRobot', 12, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', 4.4, 920)
    `);

    // Books (Category 4)
    await connection.query(`
      INSERT INTO products (name, description, price, original_price, discount_percentage, category_id, brand, stock_quantity, image, rating, reviews_count) VALUES
      ('The Great Gatsby', 'F. Scott Fitzgerald classic novel', 1039, 1279, 19, 4, 'Scribner', 200, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop', 4.1, 25000),
      ('To Kill a Mockingbird', 'Harper Lee Pulitzer Prize winner', 1119, 1359, 18, 4, 'Harper Collins', 180, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop', 4.3, 18000),
      ('1984 by George Orwell', 'Dystopian masterpiece', 959, 1199, 20, 4, 'Penguin Classics', 250, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop', 4.4, 22000),
      ('Pride and Prejudice', 'Jane Austen romantic classic', 879, 1119, 21, 4, 'Penguin Classics', 160, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop', 4.2, 15000),
      ('The Catcher in the Rye', 'J.D. Salinger coming-of-age', 1039, 1279, 19, 4, 'Little Brown', 140, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop', 4.0, 12000),
      ('Harry Potter Complete Set', 'All 7 books boxed set', 4799, 6399, 25, 4, 'Scholastic', 50, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop', 4.8, 50000),
      ('The Lord of the Rings', 'J.R.R. Tolkien trilogy', 1999, 2799, 29, 4, 'Houghton Mifflin', 80, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop', 4.6, 30000),
      ('Atomic Habits', 'James Clear self-improvement', 1359, 1599, 15, 4, 'Avery', 120, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop', 4.5, 8000),
      ('The Alchemist', 'Paulo Coelho philosophical novel', 1199, 1439, 17, 4, 'HarperOne', 190, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop', 4.3, 20000),
      ('Sapiens', 'Yuval Noah Harari history', 1519, 1839, 17, 4, 'Harper', 90, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop', 4.4, 12000)
    `);

    // Sports (Category 5)
    await connection.query(`
      INSERT INTO products (name, description, price, original_price, discount_percentage, category_id, brand, stock_quantity, image, rating, reviews_count) VALUES
      ('Manduka PRO Yoga Mat', '6mm thick professional yoga mat', 3199, 3999, 20, 5, 'Manduka', 80, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', 4.3, 1200),
      ('Bowflex SelectTech 552', 'Adjustable dumbbells 5-52.5 lbs', 11999, 15999, 25, 5, 'Bowflex', 25, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', 4.5, 890),
      ('NordicTrack T Series', 'Folding treadmill with iFit', 71999, 95999, 25, 5, 'NordicTrack', 8, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', 4.4, 450),
      ('Spalding NBA Official Basketball', 'Official size 7 basketball', 1999, 2399, 17, 5, 'Spalding', 60, 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop', 4.2, 680),
      ('Wilson Pro Staff 97 Tennis Racket', 'Professional tennis racket', 15999, 19999, 20, 5, 'Wilson', 20, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop', 4.6, 340),
      ('TRX ALL-IN-ONE Suspension Trainer', 'Complete bodyweight training kit', 2399, 3199, 25, 5, 'TRX', 70, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', 4.3, 780),
      ('Optimum Nutrition Gold Standard', 'Whey protein powder 2.27kg', 3999, 4799, 17, 5, 'Optimum Nutrition', 50, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', 4.5, 1500),
      ('Giro Syntax MIPS Helmet', 'Road cycling helmet with MIPS', 6399, 7999, 20, 5, 'Giro', 35, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', 4.4, 560),
      ('Speedo Vanquisher 2.0', 'Competition swimming goggles', 1599, 1999, 20, 5, 'Speedo', 90, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', 4.2, 890),
      ('Nike Vapor Elite Football', 'Official size football', 2799, 3599, 22, 5, 'Nike', 45, 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop', 4.3, 450)
    `);

    // Add realistic orders with sales data
    await connection.query(`
      INSERT INTO orders (id, user_id, total_amount, status, shipping_address, created_at) VALUES
      (1, 1, 91998, 'delivered', '123 MG Road, Bangalore, Karnataka 560001', '2024-01-10 10:30:00'),
      (2, 2, 15198, 'delivered', '456 CP, New Delhi, Delhi 110001', '2024-01-12 14:20:00'),
      (3, 3, 79999, 'shipped', '789 Marine Drive, Mumbai, Maharashtra 400001', '2024-01-15 09:15:00'),
      (4, 1, 4799, 'delivered', '123 MG Road, Bangalore, Karnataka 560001', '2024-01-18 16:45:00'),
      (5, 4, 27999, 'processing', '321 Park Street, Kolkata, West Bengal 700016', '2024-01-20 11:30:00'),
      (6, 2, 10399, 'delivered', '456 CP, New Delhi, Delhi 110001', '2024-01-22 13:20:00'),
      (7, 3, 51999, 'shipped', '789 Marine Drive, Mumbai, Maharashtra 400001', '2024-01-24 15:10:00'),
      (8, 1, 19999, 'delivered', '123 MG Road, Bangalore, Karnataka 560001', '2024-01-25 12:00:00'),
      (9, 4, 103999, 'processing', '321 Park Street, Kolkata, West Bengal 700016', '2024-01-26 10:15:00'),
      (10, 2, 6399, 'delivered', '456 CP, New Delhi, Delhi 110001', '2024-01-27 14:30:00')
    `);

    // Add order items for realistic sales data
    await connection.query(`
      INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
      (1, 1, 1, 79999), (1, 7, 1, 11999),
      (2, 11, 1, 10399), (2, 21, 1, 4799),
      (3, 3, 1, 79999),
      (4, 13, 1, 4799),
      (5, 9, 1, 27999),
      (6, 11, 1, 10399),
      (7, 12, 1, 51999),
      (8, 7, 1, 19999),
      (9, 6, 1, 103999),
      (10, 23, 1, 6399)
    `);

    // Verify data was inserted
    const [productCount] = await connection.query('SELECT COUNT(*) as count FROM products');
    const [userCount] = await connection.query('SELECT COUNT(*) as count FROM users');
    const [orderCount] = await connection.query('SELECT COUNT(*) as count FROM orders');

    console.log('✅ Data setup completed successfully!');
    console.log(`📦 Products: ${productCount[0].count}`);
    console.log(`👥 Users: ${userCount[0].count}`);
    console.log(`🛒 Orders: ${orderCount[0].count}`);

    await connection.end();
  } catch (error) {
    console.error('❌ Error setting up data:', error);
  }
}

setupCompleteData();