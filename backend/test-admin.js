const axios = require('axios');

async function testAdminAPI() {
  try {
    // First login to get token
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@example.com',
      password: 'admin123'
    });
    
    const token = loginResponse.data.token;
    console.log('Login successful, token received');
    
    // Test admin products endpoint
    const productsResponse = await axios.get('http://localhost:5000/api/admin/products', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('Admin products count:', productsResponse.data.length);
    console.log('First product:', productsResponse.data[0]?.name || 'No products');
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testAdminAPI();