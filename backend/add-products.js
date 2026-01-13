const db = require('./config/database');

async function addMoreProducts() {
  try {
    // Clear existing products
    await db.execute('DELETE FROM products');
    
    // Insert comprehensive product list
    await db.execute(`
      INSERT INTO products (name, description, price, original_price, discount_percentage, category_id, brand, stock_quantity, image, rating, reviews_count) VALUES
      -- Electronics (category_id = 1)
      ('iPhone 15 Pro', 'Latest iPhone with A17 Pro chip and titanium design', 999.99, 1199.99, 17, 1, 'Apple', 50, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400', 4.5, 1250),
      ('Samsung Galaxy S24 Ultra', 'Premium Android with S Pen and AI features', 1199.99, 1299.99, 8, 1, 'Samsung', 30, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', 4.6, 890),
      ('MacBook Air M3', 'Lightweight laptop with M3 chip', 1099.99, 1199.99, 8, 1, 'Apple', 25, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', 4.7, 2100),
      ('iPad Pro 12.9', 'Professional tablet with M2 chip', 799.99, 899.99, 11, 1, 'Apple', 40, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', 4.4, 1800),
      ('Sony WH-1000XM5', 'Industry-leading noise cancelling headphones', 349.99, 399.99, 13, 1, 'Sony', 100, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', 4.6, 1500),
      ('Dell XPS 13', 'Ultra-portable Windows laptop', 899.99, 999.99, 10, 1, 'Dell', 35, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', 4.3, 950),
      ('AirPods Pro 2', 'Wireless earbuds with active noise cancellation', 249.99, 279.99, 11, 1, 'Apple', 150, 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400', 4.5, 3200),
      ('Nintendo Switch OLED', 'Portable gaming console with OLED screen', 349.99, 349.99, 0, 1, 'Nintendo', 80, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', 4.7, 2800),
      
      -- Fashion (category_id = 2)
      ('Nike Air Max 270', 'Comfortable running shoes with Max Air', 129.99, 149.99, 13, 2, 'Nike', 200, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 4.4, 750),
      ('Levis 501 Original Jeans', 'Classic straight fit jeans since 1873', 59.99, 79.99, 25, 2, 'Levis', 150, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', 4.2, 650),
      ('Adidas Ultraboost 22', 'Premium running shoes with Boost technology', 179.99, 199.99, 10, 2, 'Adidas', 120, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', 4.5, 890),
      ('Ray-Ban Aviator Sunglasses', 'Classic aviator style sunglasses', 149.99, 179.99, 17, 2, 'Ray-Ban', 75, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', 4.6, 1200),
      ('North Face Jacket', 'Waterproof outdoor jacket', 199.99, 249.99, 20, 2, 'The North Face', 60, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400', 4.3, 420),
      ('Calvin Klein Watch', 'Minimalist stainless steel watch', 89.99, 119.99, 25, 2, 'Calvin Klein', 90, 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400', 4.1, 380),
      ('Tommy Hilfiger Polo', 'Classic fit polo shirt', 49.99, 69.99, 29, 2, 'Tommy Hilfiger', 180, 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400', 4.0, 520),
      ('Converse Chuck Taylor', 'Classic canvas sneakers', 54.99, 64.99, 15, 2, 'Converse', 220, 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400', 4.2, 1800),
      
      -- Home & Kitchen (category_id = 3)
      ('KitchenAid Stand Mixer', 'Professional 5-quart stand mixer', 299.99, 349.99, 14, 3, 'KitchenAid', 25, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 4.8, 3200),
      ('Dyson V15 Detect', 'Cordless vacuum with laser dust detection', 649.99, 749.99, 13, 3, 'Dyson', 40, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 4.5, 1800),
      ('Instant Pot Duo 7-in-1', 'Multi-use pressure cooker', 79.99, 99.99, 20, 3, 'Instant Pot', 100, 'https://images.unsplash.com/photo-1585515656643-1e4d8f9d4e4c?w=400', 4.6, 2500),
      ('Ninja Blender Pro', 'High-performance blender for smoothies', 99.99, 129.99, 23, 3, 'Ninja', 80, 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400', 4.4, 1100),
      ('Cuisinart Coffee Maker', '12-cup programmable coffee maker', 89.99, 109.99, 18, 3, 'Cuisinart', 60, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', 4.2, 890),
      ('Lodge Cast Iron Skillet', '12-inch pre-seasoned cast iron pan', 34.99, 44.99, 22, 3, 'Lodge', 150, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 4.7, 1600),
      ('Shark Robot Vacuum', 'Self-emptying robot vacuum cleaner', 399.99, 499.99, 20, 3, 'Shark', 35, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 4.3, 750),
      ('Philips Air Fryer', 'Digital air fryer with rapid air technology', 149.99, 179.99, 17, 3, 'Philips', 70, 'https://images.unsplash.com/photo-1585515656643-1e4d8f9d4e4c?w=400', 4.5, 1200),
      
      -- Books (category_id = 4)
      ('The Great Gatsby', 'Classic American novel by F. Scott Fitzgerald', 12.99, 15.99, 19, 4, 'Scribner', 500, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', 4.1, 25000),
      ('To Kill a Mockingbird', 'Pulitzer Prize-winning novel by Harper Lee', 13.99, 16.99, 18, 4, 'Harper Perennial', 400, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', 4.3, 18000),
      ('1984 by George Orwell', 'Dystopian social science fiction novel', 11.99, 14.99, 20, 4, 'Signet Classics', 600, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', 4.4, 22000),
      ('Pride and Prejudice', 'Classic romance novel by Jane Austen', 10.99, 13.99, 21, 4, 'Penguin Classics', 450, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', 4.2, 16000),
      ('The Catcher in the Rye', 'Coming-of-age novel by J.D. Salinger', 12.49, 15.99, 22, 4, 'Little Brown', 350, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', 4.0, 14000),
      ('Harry Potter Complete Set', 'All 7 books in the magical series', 59.99, 79.99, 25, 4, 'Scholastic', 200, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', 4.8, 35000),
      ('Atomic Habits', 'Self-help book on building good habits', 16.99, 19.99, 15, 4, 'Avery', 300, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', 4.6, 8500),
      ('The Psychology of Money', 'Financial wisdom and behavioral insights', 15.99, 18.99, 16, 4, 'Harriman House', 250, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', 4.5, 6200),
      
      -- Sports (category_id = 5)
      ('Yoga Mat Premium', 'Non-slip exercise mat with alignment lines', 39.99, 49.99, 20, 5, 'Manduka', 80, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', 4.3, 420),
      ('Adjustable Dumbbells', 'Space-saving adjustable weight set', 299.99, 399.99, 25, 5, 'Bowflex', 30, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', 4.5, 890),
      ('Resistance Bands Set', 'Complete resistance training kit', 24.99, 34.99, 29, 5, 'Fit Simplify', 150, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', 4.4, 1200),
      ('Foam Roller', 'High-density foam roller for muscle recovery', 29.99, 39.99, 25, 5, 'TriggerPoint', 100, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', 4.2, 650),
      ('Basketball Official Size', 'Official size and weight basketball', 49.99, 59.99, 17, 5, 'Spalding', 120, 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400', 4.3, 780),
      ('Tennis Racket Pro', 'Professional tennis racket', 149.99, 199.99, 25, 5, 'Wilson', 45, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400', 4.4, 320),
      ('Fitness Tracker Watch', 'Advanced fitness and health monitoring', 199.99, 249.99, 20, 5, 'Fitbit', 85, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', 4.1, 1500),
      ('Protein Powder Whey', 'Premium whey protein supplement', 39.99, 49.99, 20, 5, 'Optimum Nutrition', 200, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', 4.6, 2800)
    `);
    
    console.log('Added comprehensive product catalog!');
    
    // Verify count by category
    const [electronics] = await db.execute('SELECT COUNT(*) as count FROM products WHERE category_id = 1');
    const [fashion] = await db.execute('SELECT COUNT(*) as count FROM products WHERE category_id = 2');
    const [home] = await db.execute('SELECT COUNT(*) as count FROM products WHERE category_id = 3');
    const [books] = await db.execute('SELECT COUNT(*) as count FROM products WHERE category_id = 4');
    const [sports] = await db.execute('SELECT COUNT(*) as count FROM products WHERE category_id = 5');
    const [total] = await db.execute('SELECT COUNT(*) as count FROM products');
    
    console.log('Products by category:');
    console.log('Electronics:', electronics[0].count);
    console.log('Fashion:', fashion[0].count);
    console.log('Home & Kitchen:', home[0].count);
    console.log('Books:', books[0].count);
    console.log('Sports:', sports[0].count);
    console.log('Total:', total[0].count);
    
  } catch (error) {
    console.error('Error adding products:', error);
  }
  process.exit(0);
}

addMoreProducts();