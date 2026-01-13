import React, { useState, useEffect } from 'react';
import { Container, Card, Badge, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [isAuthenticated, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await ordersAPI.cancel(orderId);
        fetchOrders(); // Refresh orders list
        alert('Order cancelled successfully');
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to cancel order');
      }
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'shipped': return 'primary';
      case 'delivered': return 'success';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
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

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Orders</h2>
        <Button as={Link} to="/products" variant="outline-primary">
          Continue Shopping
        </Button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-box-seam fs-1 text-muted mb-3"></i>
          <h4>No orders found</h4>
          <p className="text-muted mb-4">You haven't placed any orders yet</p>
          <Button as={Link} to="/products" variant="primary">
            Start Shopping
          </Button>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <Card key={order.id} className="order-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="mb-1">Order #{order.id}</h5>
                    <p className="text-muted mb-0">
                      Placed on {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge bg={getStatusBadgeVariant(order.status)} className="status-badge">
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>

                <div className="mb-3">
                  <strong>Total: ${parseFloat(order.total_amount).toFixed(2)}</strong>
                </div>

                {order.shipping_address && (
                  <div className="mb-3">
                    <small className="text-muted">
                      <strong>Shipping Address:</strong><br />
                      {order.shipping_address}
                    </small>
                  </div>
                )}

                <div className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    View Details
                  </Button>
                  
                  {order.status === 'pending' && (
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel Order
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Orders;