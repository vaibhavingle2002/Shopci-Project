import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={3}>
            <h5 className="text-primary mb-3">
              <i className="bi bi-shop me-2"></i>
              FlipMart
            </h5>
            <p className="text-muted">
              Your one-stop destination for all your shopping needs. Quality products at unbeatable prices.
            </p>
          </Col>
          
          <Col md={3}>
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/products" className="text-muted text-decoration-none">All Products</a></li>
              <li><a href="/products?category=1" className="text-muted text-decoration-none">Electronics</a></li>
              <li><a href="/products?category=2" className="text-muted text-decoration-none">Fashion</a></li>
              <li><a href="/products?category=3" className="text-muted text-decoration-none">Home & Kitchen</a></li>
            </ul>
          </Col>
          
          <Col md={3}>
            <h6 className="mb-3">Customer Service</h6>
            <ul className="list-unstyled">
              <li><span className="text-muted text-decoration-none">Contact Us</span></li>
              <li><span className="text-muted text-decoration-none">FAQ</span></li>
              <li><span className="text-muted text-decoration-none">Shipping Info</span></li>
              <li><span className="text-muted text-decoration-none">Returns</span></li>
            </ul>
          </Col>
          
          <Col md={3}>
            <h6 className="mb-3">Connect With Us</h6>
            <div className="d-flex gap-3">
              <span className="text-muted fs-4"><i className="bi bi-facebook"></i></span>
              <span className="text-muted fs-4"><i className="bi bi-twitter"></i></span>
              <span className="text-muted fs-4"><i className="bi bi-instagram"></i></span>
              <span className="text-muted fs-4"><i className="bi bi-linkedin"></i></span>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row>
          <Col className="text-center">
            <p className="text-muted mb-0">
              &copy; 2024 FlipMart. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;