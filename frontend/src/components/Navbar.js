import React, { useState } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Badge, Dropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <BootstrapNavbar bg="primary" variant="dark" expand="lg" fixed="top" className="shadow-sm">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold fs-4">
          <i className="bi bi-bag-check-fill me-2"></i>
          ShopCI
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <form className="d-flex mx-auto" style={{ width: '100%', maxWidth: '500px' }} onSubmit={handleSearch}>
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Search for products, brands and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn" type="submit" style={{ background: '#ffe11b', color: '#2874f0', fontWeight: '600' }}>
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>

          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Link as={Link} to="/products" className="d-flex align-items-center px-3">
              <i className="bi bi-grid me-1"></i>
              Products
            </Nav.Link>
            
            {isAdmin && (
              <Nav.Link as={Link} to="/admin" className="text-warning">
                <i className="bi bi-gear-fill me-1"></i>
                Admin
              </Nav.Link>
            )}
            
            <Nav.Link as={Link} to="/cart" className="position-relative d-flex align-items-center px-3">
              <i className="bi bi-cart3 fs-5 me-1"></i>
              Cart
              {getCartItemsCount() > 0 && (
                <Badge bg="danger" pill className="position-absolute" style={{ top: '5px', right: '5px', fontSize: '0.7em' }}>
                  {getCartItemsCount()}
                </Badge>
              )}
            </Nav.Link>

            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  <i className="bi bi-person-circle me-1"></i>
                  {user?.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">
                    <i className="bi bi-person me-2"></i>
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/orders">
                    <i className="bi bi-box-seam me-2"></i>
                    My Orders
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="d-flex align-items-center px-3">
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="px-2">
                  <Button variant="outline-light" size="sm" className="px-3">
                    <i className="bi bi-person-plus me-1"></i>
                    Sign Up
                  </Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;