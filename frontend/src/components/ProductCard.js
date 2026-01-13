import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      const result = await addToCart(product.id);
      if (result.success) {
        // Show success message with better UX
        const button = e.target;
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="bi bi-check-circle me-2"></i>Added!';
        button.disabled = true;
        
        setTimeout(() => {
          button.innerHTML = originalText;
          button.disabled = false;
        }, 2000);
      } else {
        alert(result.error || 'Failed to add to cart');
      }
    } catch (error) {
      alert('Failed to add to cart');
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

  return (
    <Card className="product-card h-100 position-relative">
      {product.discount_percentage > 0 && (
        <div className="discount-badge">
          {product.discount_percentage}% OFF
        </div>
      )}
      
      <Link to={`/product/${product.id}`} className="text-decoration-none">
        <Card.Img 
          variant="top" 
          src={product.image} 
          className="product-image"
          alt={product.name}
        />
        
        <Card.Body className="d-flex flex-column p-3">
          <Card.Title className="text-dark fw-semibold mb-2" style={{ minHeight: '48px', fontSize: '14px', lineHeight: '1.4' }}>
            {product.name}
          </Card.Title>
          
          <div className="mb-2">
            <span className="text-muted small fw-medium">{product.brand}</span>
          </div>
          
          <div className="mb-2">
            <span className="rating-badge">
              {product.rating} <i className="bi bi-star-fill"></i>
            </span>
            <span className="text-muted ms-2 small">({product.reviews_count?.toLocaleString()})</span>
          </div>
          
          <div className="mb-3">
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold text-dark" style={{ fontSize: '16px' }}>₹{Math.round(product.price * 80).toLocaleString()}</span>
              {product.original_price && product.original_price > product.price && (
                <>
                  <span className="text-decoration-line-through text-muted small">₹{Math.round(product.original_price * 80).toLocaleString()}</span>
                  <span className="text-success small fw-bold">{product.discount_percentage}% off</span>
                </>
              )}
            </div>
          </div>
          
          <div className="mt-auto">
            <Button 
              variant="primary" 
              size="sm" 
              className="w-100 fw-semibold"
              onClick={handleAddToCart}
              style={{ borderRadius: '8px', padding: '10px' }}
            >
              <i className="bi bi-cart-plus me-2"></i>
              Add to Cart
            </Button>
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ProductCard;