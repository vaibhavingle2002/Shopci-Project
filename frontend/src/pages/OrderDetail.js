import React, { useState, useEffect } from 'react';
import { Container, Card, Badge, Button, Row, Col, Table } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ordersAPI } from '../services/api';

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const response = await ordersAPI.getById(id);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
      if (error.response?.status === 404) {
        navigate('/orders');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
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

  if (!order) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h4>Order not found</h4>
          <Button as={Link} to="/orders" variant="primary">
            Back to Orders
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Button 
            variant="outline-secondary" 
            onClick={() => navigate('/orders')}
            className="mb-2"
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to Orders
          </Button>
          <h2>Order #{order.id}</h2>
        </div>
        <Badge bg={getStatusBadgeVariant(order.status)} className="fs-6 px-3 py-2">
          {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
        </Badge>
      </div>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Order Items</h5>
            </Card.Header>
            <Card.Body>
              {order.items?.length > 0 ? (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                              className="rounded me-3"
                            />
                            <div>
                              <h6 className="mb-0">{item.name}</h6>
                            </div>
                          </div>
                        </td>
                        <td>{item.quantity}</td>
                        <td>${parseFloat(item.price).toFixed(2)}</td>
                        <td>${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-muted">No items found for this order.</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Order Date:</span>
                <span>{new Date(order.created_at).toLocaleDateString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Status:</span>
                <Badge bg={getStatusBadgeVariant(order.status)}>
                  {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                </Badge>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-0">
                <strong>Total Amount:</strong>
                <strong>${parseFloat(order.total_amount).toFixed(2)}</strong>
              </div>
            </Card.Body>
          </Card>

          {order.shipping_address && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">Shipping Address</h5>
              </Card.Header>
              <Card.Body>
                <p className="mb-0">{order.shipping_address}</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetail;