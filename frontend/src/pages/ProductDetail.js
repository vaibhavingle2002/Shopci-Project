import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Badge, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productsAPI.getById(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const result = await addToCart(product.id, quantity);
    if (result.success) {
      alert('Product added to cart!');
    } else {
      alert(result.error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star text-warning"></i>);
    }

    return stars;
  };

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

  if (!product) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h4>Product not found</h4>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col md={6} className="mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{ width: '100%', height: '500px', objectFit: 'cover' }}
          />
        </Col>
        
        <Col md={6}>
          <div className="mb-2">
            <Badge bg="secondary">{product.category_name}</Badge>
          </div>
          
          <h1 className="mb-3">{product.name}</h1>
          
          <div className="mb-3">
            <span className="text-muted">Brand: </span>
            <strong>{product.brand}</strong>
          </div>
          
          <div className="mb-3">
            {renderStars(product.rating)}
            <span className="ms-2 text-muted">
              {product.rating} ({product.reviews_count} reviews)
            </span>
          </div>
          
          <div className="mb-4">
            <div className="d-flex align-items-center gap-3">
              <span className="h3 text-success mb-0">${product.price}</span>
              {product.original_price && product.original_price > product.price && (
                <>
                  <span className="h5 text-muted text-decoration-line-through mb-0">
                    ${product.original_price}
                  </span>
                  <Badge bg="danger">
                    {product.discount_percentage}% OFF
                  </Badge>
                </>
              )}
            </div>
          </div>
          
          <div className="mb-4">
            <h6>Description</h6>
            <p className="text-muted">{product.description}</p>
          </div>
          
          <div className="mb-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span>Quantity:</span>
              <Form.Select
                style={{ width: '80px' }}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                {[...Array(Math.min(10, product.stock_quantity))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </Form.Select>
            </div>
            
            <div className="mb-3">
              {product.stock_quantity > 0 ? (
                <Badge bg="success">In Stock ({product.stock_quantity} available)</Badge>
              ) : (
                <Badge bg="danger">Out of Stock</Badge>
              )}
            </div>
          </div>
          
          <div className="d-grid gap-2 d-md-flex">
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock_quantity === 0}
              className="flex-fill"
            >
              <i className="bi bi-cart-plus me-2"></i>
              Add to Cart
            </Button>
            <Button
              variant="outline-primary"
              size="lg"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-light rounded">
            <div className="row text-center">
              <div className="col-4">
                <i className="bi bi-truck fs-4 text-primary"></i>
                <div className="small mt-1">Free Shipping</div>
              </div>
              <div className="col-4">
                <i className="bi bi-arrow-clockwise fs-4 text-primary"></i>
                <div className="small mt-1">Easy Returns</div>
              </div>
              <div className="col-4">
                <i className="bi bi-shield-check fs-4 text-primary"></i>
                <div className="small mt-1">Secure Payment</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;