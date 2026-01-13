import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Alert } from 'react-bootstrap';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <h4>Access Denied</h4>
          <p>You don't have permission to access this page. Admin access required.</p>
        </Alert>
      </Container>
    );
  }

  return children;
};

export default ProtectedRoute;