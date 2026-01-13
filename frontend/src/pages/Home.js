import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { productsAPI, categoriesAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        productsAPI.getFeatured(),
        categoriesAPI.getAll()
      ]);
      
      setFeaturedProducts(productsResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                Welcome to ShopCI
              </h1>
              <p className="lead mb-4">
                Your modern e-commerce destination. Discover amazing products at unbeatable prices with a seamless shopping experience.
              </p>
              <Button as={Link} to="/products" size="lg" className="me-3">
                Shop Now
              </Button>
              <Button variant="outline-light" size="lg">
                Learn More
              </Button>
            </Col>
            <Col lg={6}>
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600" 
                alt="Shopping" 
                className="img-fluid rounded"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">Shop by Category</h2>
          <Row>
            {categories.map((category) => (
              <Col key={category.id} md={6} lg={4} className="mb-4">
                <Card className="category-card border-0 shadow-sm">
                  <Link to={`/products?category=${category.id}`} className="text-decoration-none">
                    <Card.Img 
                      variant="top" 
                      src={category.image} 
                      className="category-image"
                      alt={category.name}
                    />
                    <Card.Body className="text-center">
                      <Card.Title className="text-dark">{category.name}</Card.Title>
                      <Card.Text className="text-muted">
                        {category.description}
                      </Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2>Featured Products</h2>
            <Button as={Link} to="/products" variant="outline-primary">
              View All Products
            </Button>
          </div>
          
          <Row>
            {featuredProducts.map((product) => (
              <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <div className="mb-3">
                <i className="bi bi-truck fs-1 text-primary"></i>
              </div>
              <h5>Free Shipping</h5>
              <p className="text-muted">Free shipping on orders over $50</p>
            </Col>
            <Col md={3} className="mb-4">
              <div className="mb-3">
                <i className="bi bi-arrow-clockwise fs-1 text-primary"></i>
              </div>
              <h5>Easy Returns</h5>
              <p className="text-muted">30-day return policy</p>
            </Col>
            <Col md={3} className="mb-4">
              <div className="mb-3">
                <i className="bi bi-headset fs-1 text-primary"></i>
              </div>
              <h5>24/7 Support</h5>
              <p className="text-muted">Round the clock customer support</p>
            </Col>
            <Col md={3} className="mb-4">
              <div className="mb-3">
                <i className="bi bi-shield-check fs-1 text-primary"></i>
              </div>
              <h5>Secure Payment</h5>
              <p className="text-muted">100% secure payment processing</p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;