import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Pagination } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { productsAPI, categoriesAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const currentCategory = searchParams.get('category') || '';
  const currentSearch = searchParams.get('search') || '';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories');
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = {
          page: currentPage,
          limit: 12
        };

        if (currentCategory) params.category = currentCategory;
        if (currentSearch) params.search = currentSearch;

        const response = await productsAPI.getAll(params);
        setProducts(response.data.products || []);
        setPagination(response.data.pagination || {});
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please check if the server is running.');
        setProducts([]);
        setPagination({});
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [currentPage, currentCategory, currentSearch]);

  const handleCategoryChange = (categoryId) => {
    const newParams = new URLSearchParams(searchParams);
    if (categoryId) {
      newParams.set('category', categoryId);
    } else {
      newParams.delete('category');
    }
    newParams.delete('page');
    setSearchParams(newParams);
  };

  const handlePageChange = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page);
    setSearchParams(newParams);
  };

  const renderPagination = () => {
    if (!pagination.pages || pagination.pages <= 1) return null;

    const items = [];
    const { page, pages } = pagination;

    // Previous button
    items.push(
      <Pagination.Prev
        key="prev"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      />
    );

    // Page numbers
    for (let i = 1; i <= pages; i++) {
      if (i === 1 || i === pages || (i >= page - 2 && i <= page + 2)) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === page}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      } else if (i === page - 3 || i === page + 3) {
        items.push(<Pagination.Ellipsis key={`ellipsis-${i}`} />);
      }
    }

    // Next button
    items.push(
      <Pagination.Next
        key="next"
        disabled={page === pages}
        onClick={() => handlePageChange(page + 1)}
      />
    );

    return <Pagination className="justify-content-center">{items}</Pagination>;
  };

  return (
    <Container className="py-4">
      <Row>
        {/* Sidebar */}
        <Col lg={3} className="mb-4">
          <div className="filters-sidebar">
            <h6>Filters</h6>
            
            <div className="mb-3">
              <h6>Category</h6>
              <div className="d-flex flex-column gap-2">
                <label className="d-flex align-items-center">
                  <input 
                    type="radio" 
                    name="category" 
                    value="" 
                    checked={!currentCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="me-2"
                  />
                  All Categories
                </label>
                {categories.map((category) => (
                  <label key={category.id} className="d-flex align-items-center">
                    <input 
                      type="radio" 
                      name="category" 
                      value={category.id}
                      checked={currentCategory === category.id.toString()}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="me-2"
                    />
                    {category.name}
                  </label>
                ))}
              </div>
            </div>

            {(currentCategory || currentSearch) && (
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setSearchParams({})}
                className="w-100"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </Col>

        {/* Products */}
        <Col lg={9}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Products</h2>
            <div className="text-muted">
              {pagination.total} products found
            </div>
          </div>

          {error ? (
            <div className="text-center py-5">
              <i className="bi bi-exclamation-triangle fs-1 text-danger mb-3"></i>
              <h4 className="text-danger">Error</h4>
              <p className="text-muted">{error}</p>
              <Button variant="primary" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          ) : loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-search fs-1 text-muted mb-3"></i>
              <h4>No products found</h4>
              <p className="text-muted">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <Row>
                {products.map((product) => (
                  <Col key={product.id} sm={6} md={4} className="mb-4">
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>

              {renderPagination()}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Products;