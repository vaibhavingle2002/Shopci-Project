import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const AdminNavbar = () => {
  const location = useLocation();

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container fluid>
        <BootstrapNavbar.Brand as={Link} to="/admin" className="fw-bold">
          <i className="bi bi-gear-fill me-2"></i>
          ShopCI Admin
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="admin-navbar-nav" />
        <BootstrapNavbar.Collapse id="admin-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/admin" 
              active={location.pathname === '/admin'}
            >
              <i className="bi bi-speedometer2 me-1"></i>
              Dashboard
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/products" 
              active={location.pathname === '/admin/products'}
            >
              <i className="bi bi-box-seam me-1"></i>
              Products
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/orders" 
              active={location.pathname === '/admin/orders'}
            >
              <i className="bi bi-cart-check me-1"></i>
              Orders
            </Nav.Link>
          </Nav>
          
          <Nav>
            <Nav.Link as={Link} to="/" className="text-light">
              <i className="bi bi-arrow-left me-1"></i>
              Back to Store
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default AdminNavbar;