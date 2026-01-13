import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <i className="bi bi-cart-x fs-1 text-muted mb-3"></i>
          <h4>Please login to view your cart</h4>
          <Button as={Link} to="/login" variant="primary">
            Login
          </Button>
        </div>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <i className="bi bi-cart-x fs-1 text-muted mb-3"></i>
          <h4>Your cart is empty</h4>
          <p className="text-muted mb-4">Add some products to get started</p>
          <Button as={Link} to="/products" variant="primary">
            Continue Shopping
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Shopping Cart</h2>
      
      <Row>
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <Row className="align-items-center">
                    <Col md={2}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                        style={{ height: '80px', objectFit: 'cover' }}
                      />
                    </Col>
                    
                    <Col md={4}>
                      <h6 className="mb-1">{item.name}</h6>
                      <p className="text-muted small mb-0">
                        ${item.price} each
                      </p>
                    </Col>
                    
                    <Col md={3}>
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        <span className="mx-3">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, Math.min(item.stock_quantity, item.quantity + 1))}
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                    </Col>
                    
                    <Col md={2}>
                      <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    </Col>
                    
                    <Col md={1}>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <strong>${getCartTotal().toFixed(2)}</strong>
              </div>
              
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping:</span>
                <span className="text-success">Free</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-4">
                <strong>Total:</strong>
                <strong className="text-primary">${getCartTotal().toFixed(2)}</strong>
              </div>
              
              <Button
                variant="primary"
                size="lg"
                className="w-100 mb-3"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
              
              <Button
                variant="outline-primary"
                className="w-100"
                as={Link}
                to="/products"
              >
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;