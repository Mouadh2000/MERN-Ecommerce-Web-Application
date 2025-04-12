import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from 'react-loader-spinner'
import assortment from "../../images/dattes.png";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import ScrollToTop from "../ScrollToTop";
import { getAllProduct, getProductsByCategory, checkProductStock } from "../../Api/productApi";
import { getAllCategory } from "../../Api/CategoryApi";
import { useCart } from "../../context/CartContext";

function Dropdown() {
  
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loaderStatus, setLoaderStatus] = useState(true);
  const [stockStatus, setStockStatus] = useState({});
  const { handleAddToCart } = useCart();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await getAllCategory();
        setCategories(categoriesResponse.data);
        
        const productsResponse = await getAllProduct();
        setProducts(productsResponse.data || []);
        
        if (productsResponse.data && productsResponse.data.length > 0) {
          const stockPromises = productsResponse.data.map(async (product) => {
            try {
              const stockResponse = await checkProductStock(product._id);
              return { productId: product._id, inStock: stockResponse.data.inStock };
            } catch (error) {
              console.error(`Error checking stock for ${product._id}:`, error);
              return { productId: product._id, inStock: false };
            }
          });
      
          const stockResults = await Promise.all(stockPromises);
          
          const stockMap = {};
          stockResults.forEach(result => {
            stockMap[result.productId] = result.inStock;
          });
          
          setStockStatus(stockMap);
        } else {
          setStockStatus({});
        }
        
        setLoaderStatus(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
        setStockStatus({});
        setLoaderStatus(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleCategorySelect = async (categoryId) => {
    setLoaderStatus(true);
    setCurrentPage(1);
    try {
      const response = await getProductsByCategory(categoryId);
      setProducts(response.data || []);
      
      if (response.data && response.data.length > 0) {
        const stockPromises = response.data.map(async (product) => {
          try {
            const stockResponse = await checkProductStock(product._id);
            return { productId: product._id, inStock: stockResponse.data.inStock };
          } catch (error) {
            console.error(`Error checking stock for ${product._id}:`, error);
            return { productId: product._id, inStock: false };
          }
        });
        
        const stockResults = await Promise.all(stockPromises);
        
        const stockMap = {};
        stockResults.forEach(result => {
          stockMap[result.productId] = result.inStock;
        });
        
        setStockStatus(stockMap);
      } else {
        setStockStatus({});
      }
      
      setSelectedCategory(categoryId);
      setLoaderStatus(false);
    } catch (error) {
      console.error("Error fetching products by category:", error);
      setProducts([]);
      setStockStatus({});
      setLoaderStatus(false);
    }
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {loaderStatus ? (
        <div className="loader-container">
          <MagnifyingGlass
            visible={true}
            height="100"
            width="100"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperclassName="magnifying-glass-wrapper"
            glassColor="#c0efff"
            color="#0aad0a"
          />
        </div>
      ) : (
        <>
          <ScrollToTop/>
          <div className="container">
            <div className="row">
              <h5 className="mb-3 mt-8">Categories</h5>
              <div className="col-md-3">
                <ul className="nav flex-column">
                  {categories.map((category) => (
                    <React.Fragment key={category._id}>
                      <li className="nav-item">
                        <Link 
                          className="nav-link" 
                          to="#"
                          onClick={() => handleCategorySelect(category._id)}
                        >
                          {category.name}
                        </Link>
                      </li>
                      {category.subCategories?.map((subCategory) => (
                        <li className="nav-item ms-3" key={subCategory._id}>
                          <Link 
                            className="nav-link" 
                            to="#"
                            onClick={() => handleCategorySelect(subCategory._id)}
                          >
                            {subCategory.name}
                          </Link>
                        </li>
                      ))}
                    </React.Fragment>
                  ))}
                </ul>
                <div>
                  <div className="py-4">
                    <h5 className="mb-3">Avis</h5>
                    <div>
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue
                          id="ratingFive"
                        />
                        <label className="form-check-label" htmlFor="ratingFive">
                          <i className="bi bi-star-fill text-warning" />
                          <i className="bi bi-star-fill text-warning " />
                          <i className="bi bi-star-fill text-warning " />
                          <i className="bi bi-star-fill text-warning " />
                          <i className="bi bi-star-fill text-warning " />
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue
                          id="ratingFour"
                          defaultChecked
                        />
                        <label className="form-check-label" htmlFor="ratingFour">
                          <i className="bi bi-star-fill text-warning" />
                          <i className="bi bi-star-fill text-warning " />
                          <i className="bi bi-star-fill text-warning " />
                          <i className="bi bi-star-fill text-warning " />
                          <i className="bi bi-star text-warning" />
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue
                          id="ratingThree"
                        />
                        <label className="form-check-label" htmlFor="ratingThree">
                          <i className="bi bi-star-fill text-warning" />
                          <i className="bi bi-star-fill text-warning " />
                          <i className="bi bi-star-fill text-warning " />
                          <i className="bi bi-star text-warning" />
                          <i className="bi bi-star text-warning" />
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue
                          id="ratingTwo"
                        />
                        <label className="form-check-label" htmlFor="ratingTwo">
                          <i className="bi bi-star-fill text-warning" />
                          <i className="bi bi-star-fill text-warning" />
                          <i className="bi bi-star text-warning" />
                          <i className="bi bi-star text-warning" />
                          <i className="bi bi-star text-warning" />
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue
                          id="ratingOne"
                        />
                        <label className="form-check-label" htmlFor="ratingOne">
                          <i className="bi bi-star-fill text-warning" />
                          <i className="bi bi-star text-warning" />
                          <i className="bi bi-star text-warning" />
                          <i className="bi bi-star text-warning" />
                          <i className="bi bi-star text-warning" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="py-4">
                    <div className="position-absolute p-5 py-8">
                      <h3 className="mb-0">Dattes </h3>
                      <Link to="#" className="btn btn-dark">
                        Magasiner Maintenant
                        <i className="feather-icon icon-arrow-right ms-1" />
                      </Link>
                    </div>
                    <img
                      src={assortment}
                      alt="assortment"
                      className="img-fluid rounded-3"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-8">
                <div className="card mb-4 bg-light border-0">
                  <div className=" card-body p-9">
                    <h1 className="mb-0">
                      {selectedCategory 
                        ? categories.find(c => c.subCategories?.some(sc => sc._id === selectedCategory))?.name || "Produits"
                        : "Tous Produits"}
                    </h1>
                  </div>
                </div>
                <div className="d-md-flex justify-content-between align-items-center">
                  <div>
                    <p className="mb-3 mb-md-0">
                      <span className="text-dark">{products.length}</span> Produits trouvés
                    </p>
                  </div>
                </div>
                <div className="row g-4 row-cols-xl-4 row-cols-lg-3 row-cols-2 row-cols-md-2 mt-2">
                  {currentProducts.map((product) => (
                    <div className="col" key={product._id}>
                      <div className="card card-product">
                        <div className="card-body">
                          <div className="text-center position-relative">
                            {!stockStatus[product._id] && (
                              <div className="position-absolute top-0 start-0">
                                <span className="badge bg-danger">En rupture de stock</span>
                              </div>
                            )}
                            {product.discount > 0 && stockStatus[product._id] && (
                              <div className="position-absolute top-0 start-0">
                                <span className="badge bg-danger">Sale</span>
                              </div>
                            )}
                            <Link to={`/product/${product._id}`}>
                              <img
                                src={`data:image/png;base64,${product.image}`}
                                alt={product.name}
                                className="mb-3 img-fluid"
                              />
                            </Link>
                          </div>
                          <div className="text-small mb-1">
                            <Link to="#!" className="text-decoration-none text-muted">
                              <small>{product.category?.name || "Uncategorized"}</small>
                            </Link>
                          </div>
                          <h2 className="fs-6">
                            <Link to={`/product/${product._id}`} className="text-inherit text-decoration-none">
                              {product.name}
                            </Link>
                          </h2>
                          <div>
                            <small className="text-warning">
                              {[...Array(5)].map((_, i) => (
                                <i 
                                  key={i}
                                  className={`bi bi-star${i < Math.floor(product.rating) ? '-fill' : i === Math.floor(product.rating) && product.rating % 1 >= 0.5 ? '-half' : ''} text-warning`}
                                />
                              ))}
                            </small>{" "}
                            <span className="text-muted small">
                              {product.rating?.toFixed(1)}({product.reviewCount || 0})
                            </span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <div>
                              <span className="text-dark">{product.price} DT</span>
                              {product.originalPrice && (
                                <span className="text-decoration-line-through text-muted">
                                  {product.originalPrice} DT
                                </span>
                              )}
                            </div>
                            <div>
                            <Link 
                              to="#!" 
                              className={`btn btn-${stockStatus[product._id] ? 'primary' : 'danger'} btn-sm`}
                              disabled={!stockStatus[product._id]}
                              onClick={(e) => {
                                e.preventDefault();
                                if (stockStatus[product._id]) {
                                  handleAddToCart(product);
                                }
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-shopping-bag me-2"
                              >
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                <line x1={3} y1={6} x2={21} y2={6} />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                              </svg>
                              {stockStatus[product._id] ? 'Ajoutez' : 'En rupture de stock'}
                            </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="row mt-8">
                  <div className="col">
                    <nav>
                      <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <Link
                            className="page-link mx-1 rounded-3"
                            to="#"
                            aria-label="Previous"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage > 1) paginate(currentPage - 1);
                            }}
                          >
                            <i className="fa fa-chevron-left" />
                          </Link>
                        </li>
                        
                        {Array.from({ length: totalPages }, (_, i) => (
                          <li 
                            key={i} 
                            className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                          >
                            <Link
                              className={`page-link mx-1 rounded-3 ${currentPage === i + 1 ? 'active' : 'text-body'}`}
                              to="#"
                              onClick={(e) => {
                                e.preventDefault();
                                paginate(i + 1);
                              }}
                            >
                              {i + 1}
                            </Link>
                          </li>
                        ))}
                        
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <Link
                            className="page-link mx-1 rounded-3 text-body"
                            to="#"
                            aria-label="Next"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage < totalPages) paginate(currentPage + 1);
                            }}
                          >
                            <i className="fa fa-chevron-right" />
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dropdown;