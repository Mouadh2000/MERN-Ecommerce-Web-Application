import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopRatedProducts } from "../Api/productApi";
import Swal from 'sweetalert2';

const ProductItem = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRatedProducts = async () => {
      try {
        const response = await getTopRatedProducts();
        if (response && response.success) {
          setProducts(response.data);
        } else {
          throw new Error('Failed to fetch top-rated products');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error loading top-rated products',
          text: err.message,
        });
      }
    };

    fetchTopRatedProducts();
  }, []);


  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {[...Array(fullStars)].map((_, index) => <i key={index} className="bi bi-star-fill" />)}
        {halfStar && <i className="bi bi-star-half" />}
        {[...Array(emptyStars)].map((_, index) => <i key={index} className="bi bi-star" />)}
      </>
    );
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5">
        Error loading products: {error}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="alert alert-info text-center my-5">
        No products available
      </div>
    );
  }

  return (
    <div>
      {/* Top Rated Products Start*/}
      <section className="my-lg-14 my-8">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-6">
              <div className="section-head text-center mt-8">
                <h3 className='h3style' data-title="Top Rated Products">Produits les mieux notés</h3>
                <div className="wt-separator bg-primarys"></div>
                <div className="wt-separator2 bg-primarys"></div>
              </div>
            </div>
          </div>
          <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3">
            {products.map((product) => (
              <div className="col fade-zoom" key={product._id}>
                <div className="card card-product">
                  <div className="card-body">
                    <div className="text-center position-relative">
                      <Link to={`/products/${product._id}`}>
                        {product.image ? (
                          <img
                            src={`data:image/jpeg;base64,${product.image}`}
                            alt={product.name}
                            className="mb-3 img-fluid"
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                        ) : (
                          <div className="mb-3 img-fluid bg-light" style={{ height: '200px' }}></div>
                        )}
                      </Link>
                      <div className="card-product-action">
                        <Link
                          to={`/products/${product._id}`}
                        >
                          
                        </Link>
                      </div>
                    </div>
                    <div className="text-small mb-1">
                      <Link to={`/category/${product.category?._id || 'uncategorized'}`} className="text-decoration-none text-muted">
                        <small>{product.category?.name || 'Uncategorized'}</small>
                      </Link>
                    </div>
                    <h2 className="fs-6">
                      <Link
                        to={`/products/${product._id}`}
                        className="text-inherit text-decoration-none"
                      >
                        {product.name}
                      </Link>
                    </h2>
                    <div className="text-warning">
                      <small>
                        {renderStars(product.rating)}
                      </small>
                      <span className="text-muted small">({product.rating})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Top Rated Products End*/}
    </div>
  );
};

export default ProductItem;
