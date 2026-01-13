const db = require('./config/database');

async function resetProducts() {
  try {
    // Clear existing products
    await db.execute('DELETE FROM products');
    
    // Insert products with realistic prices
    await db.execute(`
      INSERT INTO products (id, name, description, price, original_price, discount_percentage, category_id, brand, stock_quantity, image, rating, reviews_count) VALUES
      (1, 'iPhone 15 Pro', 'Latest iPhone with advanced features and A17 Pro chip', 999.99, 1199.99, 17, 1, 'Apple', 50, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop', 4.5, 1250),
      (2, 'Samsung Galaxy S24', 'Premium Android smartphone with AI features', 899.99, 999.99, 10, 1, 'Samsung', 75, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop', 4.3, 890),
      (3, 'MacBook Air M2', 'Lightweight laptop with M2 chip and all-day battery', 1199.99, 1299.99, 8, 1, 'Apple', 30, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', 4.7, 2100),
      (4, 'Sony WH-1000XM5', 'Industry-leading noise cancelling headphones', 349.99, 399.99, 13, 1, 'Sony', 100, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', 4.6, 1500),
      (5, 'Nike Air Max 270', 'Comfortable running shoes with Max Air cushioning', 129.99, 149.99, 13, 2, 'Nike', 200, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', 4.4, 750),
      (6, 'Levis 501 Jeans', 'Classic straight fit jeans - original since 1873', 59.99, 79.99, 25, 2, 'Levis', 150, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop', 4.2, 650),
      (7, 'KitchenAid Stand Mixer', 'Professional 5-quart stand mixer for baking', 299.99, 349.99, 14, 3, 'KitchenAid', 25, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', 4.8, 3200),
      (8, 'Dyson V15 Vacuum', 'Cordless vacuum with laser dust detection', 649.99, 749.99, 13, 3, 'Dyson', 40, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', 4.5, 1800),
      (9, 'The Great Gatsby', 'Classic American novel by F. Scott Fitzgerald', 12.99, 15.99, 19, 4, 'Scribner', 500, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop', 4.1, 25000),
      (10, 'Yoga Mat Premium', 'Non-slip exercise mat with alignment lines', 39.99, 49.99, 20, 5, 'Manduka', 80, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', 4.3, 420)
    `);
    
    console.log('Products reset with realistic prices!');
    
    // Verify count
    const [count] = await db.execute('SELECT COUNT(*) as total FROM products');
    console.log('Total products:', count[0].total);
    
  } catch (error) {
    console.error('Error resetting products:', error);
  }
  process.exit(0);
}

resetProducts();