import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";
import ScrollToTop from "../ScrollToTop";
import { useCart } from "../../context/CartContext";

const ShopCart = () => {
  const {
    cartItems,
    handleQuantityChange,
    handleRemoveItem,
    calculateTotal,
  } = useCart();

  const [loaderStatus, setLoaderStatus] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoaderStatus(false);
    }, 1000);
  }, []);

  const incrementQuantity = (id, currentQuantity) => {
    handleQuantityChange(id, currentQuantity + 1);
  };

  const decrementQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      handleQuantityChange(id, currentQuantity - 1);
    }
  };

  return (
    <div>
      {loaderStatus ? (
        <div className="loader-container d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <MagnifyingGlass
            visible={true}
            height="100"
            width="100"
            ariaLabel="magnifying-glass-loading"
            glassColor="#c0efff"
            color="#0aad0a"
          />
        </div>
      ) : (
        <>
          <ScrollToTop />
          <section className="mb-lg-14 mb-8 mt-8">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="card py-1 border-0 mb-8">
                    <h1 className="fw-bold">Panier</h1>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-8 col-md-7">
                  <div className="py-3">
                    <ul className="list-group list-group-flush">
                      {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                          <li key={item.id} className="list-group-item py-3 px-0 border-top">
                            <div className="row align-items-center">
                              <div className="col-3 col-md-2">
                                <img
                                  src={`data:image/png;base64,${item.imgSrc}`}
                                  alt={item.name}
                                  className="img-fluid"
                                />
                                {console.log(item)}
                              </div>
                              <div className="col-4 col-md-6">
                                <h6 className="mb-0">{item.name}</h6>
                                <small className="text-muted">{item.category || "Catégorie"}</small>
                                <div className="mt-2 small">
                                <Link
                                to
                                ="#!"
                                className="text-decoration-none text-inherit"
                              >
                                  <span
                                    className="text-decoration-none text-inherit cursor-pointer"
                                    onClick={() => handleRemoveItem(item.id)}
                                  >
                                    <span className="me-1 align-text-bottom">
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
                                    className="feather feather-trash-2 text-danger"
                                  >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1={10} y1={11} x2={10} y2={17} />
                                    <line x1={14} y1={11} x2={14} y2={17} />
                                  </svg>
                                    </span>
                                    <span className="text-muted">Retirer</span>
 
                                  </span>
                                  </Link>
                                </div>
                              </div>
                              <div className="col-3 col-md-3 col-lg-2">
                            <div className="input-group  flex-nowrap justify-content-center  ">
                              <input
                                type="button"
                                defaultValue="-"
                                className="button-minus form-control  text-center flex-xl-none w-xl-30 w-xxl-10 px-0  "
                                data-field="quantity"
                                onClick={() => decrementQuantity(item.id, item.quantity)}
                              />
                              <input
                                type="number"
                                max={10}
                                value={item.quantity}
                                name="quantity"
                                className="quantity-field form-control text-center flex-xl-none w-xl-30 w-xxl-10 px-0 "
                              />
                              <input
                                type="button"
                                defaultValue="+"
                                className="button-plus form-control  text-center flex-xl-none w-xl-30  w-xxl-10 px-0  "
                                data-field="quantity"
                                onClick={() => incrementQuantity(item.id, item.quantity)}
                              />
                            </div>
                          </div>
                              <div className="col-2 text-lg-end text-start text-md-end col-md-2">
                                <span className="fw-bold">{(item.price * item.quantity).toFixed(2)} DT</span>
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item text-center">Votre panier est vide.</li>
                      )}
                    </ul>

                    <div className="d-flex justify-content-between mt-4">
                      <Link to="/Shop" className="btn btn-primary">
                        Continuer Mes Achats
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-4 col-md-5">
                  <div className="mb-5 card mt-6">
                    <div className="card-body p-6">
                      <h2 className="h5 mb-4">Résumé</h2>
                      <div className="card mb-2">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="me-auto">Total de l'Article</div>
                            <span>{calculateTotal().toFixed(2)} DT</span>
                          </li>
                        </ul>
                      </div>
                      <div className="d-grid mb-1 mt-4">
                        <Link
                          className="btn btn-primary btn-lg d-flex justify-content-between align-items-center"
                          type="submit"
                          to="/ShopCheckout"
                        >
                          Passer à la Caisse
                          <span className="fw-bold">{calculateTotal().toFixed(2)} DT</span>
                        </Link>
                      </div>
                      <p>
                        <small>
                          En passant votre commande, vous acceptez les  
                          <Link to="#!"> Conditions Générales d'Utilisation </Link> 
                          et la <Link to="#!"> Politique de Confidentialité </Link> d'Ecodattes.
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ShopCart;
