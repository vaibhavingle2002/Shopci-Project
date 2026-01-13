const mysql = require('mysql2/promise');
require('dotenv').config();

async function addMoreProducts() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    // Clear existing products first
    await connection.query('DELETE FROM products');

    // Electronics (Category 1) - 10 products
    await connection.query(`
      INSERT INTO products (name, description, price, original_price, discount_percentage, category_id, brand, stock_quantity, image, rating, reviews_count) VALUES
      ('iPhone 15 Pro', 'Latest iPhone with A17 Pro chip and titanium design', 999.99, 1199.99, 17, 1, 'Apple', 50, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop', 4.5, 1250),
      ('Samsung Galaxy S24 Ultra', 'Premium Android smartphone with S Pen', 1199.99, 1399.99, 14, 1, 'Samsung', 75, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop', 4.4, 890),
      ('MacBook Air M3', 'Lightweight laptop with M3 chip', 1299.99, 1499.99, 13, 1, 'Apple', 30, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', 4.7, 2100),
      ('Sony WH-1000XM5', 'Industry-leading noise cancelling headphones', 349.99, 399.99, 13, 1, 'Sony', 100, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', 4.6, 1500),
      ('iPad Pro 12.9', 'Powerful tablet with M2 chip and Liquid Retina display', 1099.99, 1299.99, 15, 1, 'Apple', 45, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', 4.5, 890),
      ('Dell XPS 13', 'Premium ultrabook with InfinityEdge display', 999.99, 1199.99, 17, 1, 'Dell', 25, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop', 4.3, 650),
      ('AirPods Pro 2nd Gen', 'Active noise cancellation with spatial audio', 249.99, 279.99, 11, 1, 'Apple', 120, 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop', 4.6, 1200),
      ('Samsung 55" QLED TV', '4K Smart TV with Quantum Dot technology', 799.99, 999.99, 20, 1, 'Samsung', 15, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop', 4.4, 780),
      ('Nintendo Switch OLED', 'Gaming console with vibrant OLED screen', 349.99, 399.99, 13, 1, 'Nintendo', 60, 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop', 4.5, 920),
      ('Canon EOS R6', 'Full-frame mirrorless camera', 2499.99, 2799.99, 11, 1, 'Canon', 8, 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop', 4.7, 340)
    `);

    // Fashion (Category 2) - 10 products
    await connection.query(`
      INSERT INTO products (name, description, price, original_price, discount_percentage, category_id, brand, stock_quantity, image, rating, reviews_count) VALUES
      ('Nike Air Max 270', 'Comfortable running shoes with Max Air cushioning', 129.99, 149.99, 13, 2, 'Nike', 200, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', 4.4, 750),
      ('Adidas Ultraboost 22', 'Premium running shoes with Boost technology', 179.99, 199.99, 10, 2, 'Adidas', 150, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', 4.5, 650),
      ('Levi\'s 501 Original Jeans', 'Classic straight fit jeans since 1873', 59.99, 79.99, 25, 2, 'Levi\'s', 300, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop', 4.2, 1200),
      ('Zara Wool Coat', 'Elegant winter coat for formal occasions', 149.99, 199.99, 25, 2, 'Zara', 80, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop', 4.3, 340),
      ('H&M Cotton T-Shirt', 'Basic cotton t-shirt in multiple colors', 9.99, 14.99, 33, 2, 'H&M', 500, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', 4.0, 890),
      ('Gucci Leather Handbag', 'Luxury leather handbag with signature design', 1299.99, 1499.99, 13, 2, 'Gucci', 12, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop', 4.8, 120),
      ('Ray-Ban Aviator Sunglasses', 'Classic aviator sunglasses with UV protection', 149.99, 179.99, 17, 2, 'Ray-Ban', 85, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', 4.6, 560),
      ('Converse Chuck Taylor', 'Iconic canvas sneakers in classic design', 54.99, 64.99, 15, 2, 'Converse', 180, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', 4.3, 780),
      ('Tommy Hilfiger Polo', 'Classic polo shirt with signature logo', 49.99, 69.99, 29, 2, 'Tommy Hilfiger', 120, 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop', 4.2, 450),
      ('Puma Track Suit', 'Comfortable tracksuit for sports and casual wear', 79.99, 99.99, 20, 2, 'Puma', 90, 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop', 4.1, 320)
    `);

    // Home & Kitchen (Category 3) - 10 products
    await connection.query(`
      INSERT INTO products (name, description, price, original_price, discount_percentage, category_id, brand, stock_quantity, image, rating, reviews_count) VALUES
      ('KitchenAid Stand Mixer', 'Professional 5-quart stand mixer for baking', 299.99, 349.99, 14, 3, 'KitchenAid', 25, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', 4.8, 3200),
      ('Dyson V15 Detect', 'Cordless vacuum with laser dust detection', 649.99, 749.99, 13, 3, 'Dyson', 40, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', 4.5, 1800),
      ('Instant Pot Duo 7-in-1', 'Multi-use pressure cooker and slow cooker', 79.99, 99.99, 20, 3, 'Instant Pot', 150, 'https://images.unsplash.com/photo-1585515656643-1bb0ac2ec5ee?w=400&h=400&fit=crop', 4.7, 2100),
      ('Ninja Blender Pro', 'High-performance blender for smoothies', 99.99, 129.99, 23, 3, 'Ninja', 80, 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=400&fit=crop', 4.4, 890),
      ('Breville Espresso Machine', 'Semi-automatic espresso machine', 399.99, 499.99, 20, 3, 'Breville', 20, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop', 4.6, 650),
      ('IKEA Sofa Set', 'Modern 3-seater sofa with cushions', 599.99, 799.99, 25, 3, 'IKEA', 15, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', 4.2, 340),
      ('Philips Air Fryer', 'Healthy cooking with rapid air technology', 149.99, 199.99, 25, 3, 'Philips', 60, 'https://images.unsplash.com/photo-1585515656643-1bb0ac2ec5ee?w=400&h=400&fit=crop', 4.5, 1200),
      ('Cuisinart Food Processor', '14-cup food processor for meal prep', 199.99, 249.99, 20, 3, 'Cuisinart', 35, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', 4.3, 780),
      ('Lodge Cast Iron Skillet', '12-inch pre-seasoned cast iron pan', 34.99, 44.99, 22, 3, 'Lodge', 200, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', 4.7, 1500),
      ('Shark Robot Vacuum', 'Self-emptying robot vacuum with mapping', 399.99, 499.99, 20, 3, 'Shark', 30, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', 4.4, 920)
    `);

    // Books (Category 4) - 10 products
    await connection.query(`
      INSERT INTO products (name, description, price, original_price, discount_percentage, category_id, brand, stock_quantity, image, rating, reviews_count) VALUES
      ('The Great Gatsby', 'Classic American novel by F. Scott Fitzgerald', 12.99, 15.99, 19, 4, 'Scribner', 500, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop', 4.1, 25000),
      ('To Kill a Mockingbird', 'Pulitzer Prize-winning novel by Harper Lee', 13.99, 16.99, 18, 4, 'Harper Collins', 400, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop', 4.3, 18000),
      ('1984 by George Orwell', 'Dystopian social science fiction novel', 11.99, 14.99, 20, 4, 'Penguin Classics', 600, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop', 4.4, 22000),
      ('Pride and Prejudice', 'Romantic novel by Jane Austen', 10.99, 13.99, 21, 4, 'Penguin Classics', 350, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop', 4.2, 15000),
      ('The Catcher in the Rye', 'Coming-of-age novel by J.D. Salinger', 12.99, 15.99, 19, 4, 'Little Brown', 300, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop', 4.0, 12000),
      ('Harry Potter Complete Set', 'All 7 books in the magical series', 59.99, 79.99, 25, 4, 'Scholastic', 100, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop', 4.8, 50000),
      ('The Lord of the Rings', 'Epic fantasy trilogy by J.R.R. Tolkien', 24.99, 34.99, 29, 4, 'Houghton Mifflin', 200, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop', 4.6, 30000),
      ('Atomic Habits', 'Self-help book by James Clear', 16.99, 19.99, 15, 4, 'Avery', 250, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop', 4.5, 8000),
      ('The Alchemist', 'Philosophical novel by Paulo Coelho', 14.99, 17.99, 17, 4, 'HarperOne', 400, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop', 4.3, 20000),
      ('Sapiens', 'History of humankind by Yuval Noah Harari', 18.99, 22.99, 17, 4, 'Harper', 180, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop', 4.4, 12000)
    `);

    // Sports (Category 5) - 10 products
    await connection.query(`
      INSERT INTO products (name, description, price, original_price, discount_percentage, category_id, brand, stock_quantity, image, rating, reviews_count) VALUES
      ('Yoga Mat Premium', 'Non-slip exercise mat with alignment lines', 39.99, 49.99, 20, 5, 'Manduka', 200, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', 4.3, 1200),
      ('Dumbbells Set 20kg', 'Adjustable dumbbells for home workout', 149.99, 199.99, 25, 5, 'Bowflex', 50, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', 4.5, 890),
      ('Treadmill Pro 3000', 'Electric treadmill with incline feature', 899.99, 1199.99, 25, 5, 'NordicTrack', 15, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', 4.4, 450),
      ('Basketball Official Size', 'Official size basketball for outdoor play', 24.99, 29.99, 17, 5, 'Spalding', 120, 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop', 4.2, 680),
      ('Tennis Racket Pro', 'Professional tennis racket for tournaments', 199.99, 249.99, 20, 5, 'Wilson', 40, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop', 4.6, 340),
      ('Resistance Bands Set', 'Complete set of resistance bands for training', 29.99, 39.99, 25, 5, 'TRX', 150, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', 4.3, 780),
      ('Protein Powder 2kg', 'Whey protein powder for muscle building', 49.99, 59.99, 17, 5, 'Optimum Nutrition', 100, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', 4.5, 1500),
      ('Cycling Helmet', 'Safety helmet for road and mountain biking', 79.99, 99.99, 20, 5, 'Giro', 80, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', 4.4, 560),
      ('Swimming Goggles', 'Anti-fog swimming goggles for competition', 19.99, 24.99, 20, 5, 'Speedo', 200, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', 4.2, 890),
      ('Football Official Size', 'Official size football for outdoor games', 34.99, 44.99, 22, 5, 'Nike', 90, 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop', 4.3, 450)
    `);

    console.log('✅ Added 50 products (10 per category) successfully!');
    await connection.end();
  } catch (error) {
    console.error('❌ Error adding products:', error);
  }
}

addMoreProducts();