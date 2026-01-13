const db = require('./config/database');

async function addMoreProducts() {
  try {
    // Add more products to existing categories
    await db.execute(`
      INSERT INTO products (name, description, price, original_price, discount_percentage, category_id, brand, stock_quantity, image, rating, reviews_count) VALUES
      -- More Electronics
      ('Google Pixel 8 Pro', 'AI-powered Android phone with advanced camera', 899.99, 999.99, 10, 1, 'Google', 60, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', 4.4, 720),
      ('Microsoft Surface Pro 9', 'Versatile 2-in-1 laptop tablet', 999.99, 1199.99, 17, 1, 'Microsoft', 40, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', 4.3, 650),
      ('Canon EOS R6', 'Professional mirrorless camera', 2499.99, 2799.99, 11, 1, 'Canon', 15, 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400', 4.7, 420),
      ('LG OLED 55 TV', '55-inch 4K OLED Smart TV', 1299.99, 1599.99, 19, 1, 'LG', 25, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', 4.6, 890),
      ('Bose QuietComfort Earbuds', 'Wireless noise-cancelling earbuds', 279.99, 329.99, 15, 1, 'Bose', 80, 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400', 4.5, 1200),
      
      -- More Fashion
      ('Gucci Belt', 'Luxury leather belt with GG buckle', 450.00, 520.00, 13, 2, 'Gucci', 30, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 4.3, 280),
      ('Rolex Submariner', 'Luxury diving watch', 8500.00, 9000.00, 6, 2, 'Rolex', 5, 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400', 4.9, 150),
      ('Prada Handbag', 'Designer leather handbag', 1200.00, 1400.00, 14, 2, 'Prada', 20, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 4.4, 320),
      ('Zara Dress', 'Elegant evening dress', 79.99, 99.99, 20, 2, 'Zara', 100, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', 4.1, 450),
      ('H&M Sweater', 'Cozy knit sweater', 29.99, 39.99, 25, 2, 'H&M', 200, 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400', 3.9, 680),
      
      -- More Home & Kitchen
      ('Vitamix Blender', 'Professional-grade blender', 449.99, 549.99, 18, 3, 'Vitamix', 35, 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400', 4.8, 1500),
      ('Le Creuset Dutch Oven', 'Enameled cast iron cookware', 299.99, 349.99, 14, 3, 'Le Creuset', 50, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 4.7, 890),
      ('Nespresso Machine', 'Premium coffee capsule machine', 199.99, 249.99, 20, 3, 'Nespresso', 60, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', 4.4, 1200),
      ('Roomba i7+', 'Self-emptying robot vacuum', 799.99, 999.99, 20, 3, 'iRobot', 30, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 4.5, 750),
      ('Weber Gas Grill', 'Premium outdoor gas grill', 599.99, 699.99, 14, 3, 'Weber', 25, 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400', 4.6, 420),
      
      -- More Books
      ('Dune by Frank Herbert', 'Epic science fiction novel', 14.99, 17.99, 17, 4, 'Ace Books', 300, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', 4.5, 12000),
      ('The Hobbit', 'Fantasy adventure by J.R.R. Tolkien', 13.99, 16.99, 18, 4, 'Mariner Books', 400, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', 4.6, 28000),
      ('Sapiens', 'A Brief History of Humankind', 18.99, 22.99, 17, 4, 'Harper', 250, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', 4.4, 9500),
      ('Think and Grow Rich', 'Classic self-help book', 12.99, 15.99, 19, 4, 'TarcherPerigee', 350, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', 4.2, 7800),
      ('The Alchemist', 'Philosophical novel by Paulo Coelho', 11.99, 14.99, 20, 4, 'HarperOne', 450, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', 4.3, 15000),
      
      -- More Sports
      ('Peloton Bike', 'Interactive fitness bike', 1495.00, 1695.00, 12, 5, 'Peloton', 20, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', 4.4, 2800),
      ('NordicTrack Treadmill', 'Commercial-grade treadmill', 1999.99, 2499.99, 20, 5, 'NordicTrack', 15, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', 4.3, 650),
      ('Hydro Flask Water Bottle', 'Insulated stainless steel bottle', 39.99, 44.99, 11, 5, 'Hydro Flask', 200, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', 4.5, 3200),
      ('Under Armour Shoes', 'Performance running shoes', 119.99, 139.99, 14, 5, 'Under Armour', 150, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 4.2, 890),
      ('Yeti Cooler', 'Premium ice chest cooler', 299.99, 349.99, 14, 5, 'Yeti', 40, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', 4.6, 1200)
    `);
    
    console.log('Added 25 more products!');
    
    // Get final count
    const [total] = await db.execute('SELECT COUNT(*) as count FROM products');
    console.log('Total products now:', total[0].count);
    
  } catch (error) {
    console.error('Error adding more products:', error);
  }
  process.exit(0);
}

addMoreProducts();