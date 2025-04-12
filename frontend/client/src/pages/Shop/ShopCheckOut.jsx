import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlass } from 'react-loader-spinner'
import ScrollToTop from "../ScrollToTop";
import { getAllPaymentMethods } from "../../Api/paymentMethodApi";
import { useCart } from "../../context/CartContext";
import { createClientOrder } from "../../Api/OrderApi";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

const ShopCheckOut = () => {
  const [loaderStatus, setLoaderStatus] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const { currentUser } = useAuth();
  
  const { cartItems, calculateTotal } = useCart();

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const methods = await getAllPaymentMethods();
        setPaymentMethods(methods.data);
        setLoaderStatus(false);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
        setLoaderStatus(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleMethodChange = (methodId) => {
    setSelectedMethod(methodId);
  };


  const handleSubmitOrder = async () => {
    try {
      const orderData = {
        clientId: currentUser.data._id,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        paymentMethodId: selectedMethod,
        totalAmount: calculateTotal() + 3,
      };
      const response = await createClientOrder(orderData);

      if (response.success) {
        Swal.fire({
          title: 'Succès',
          text: 'Commande passée avec succès !',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Erreur',
          text: "Une erreur s'est produite lors de la commande.",
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de la commande:", error);
      Swal.fire({
        title: 'Erreur inattendue',
        text: 'Veuillez réessayer.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  

  const renderPaymentMethodDetails = (method) => {
    if (method._id !== selectedMethod) return null;
    
    if (method.name.toLowerCase().includes('carte')) {
      return (
        <div className="row mt-3">
          <div className="col-12">
            <div className="mb-3">
              <label className="form-label">
                Numéro de carte
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="1234 4567 6789 4321"
              />
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="mb-3 mb-lg-0">
              <label className="form-label">
                Nom sur la carte
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Entrez votre prénom"
              />
            </div>
          </div>
          <div className="col-md-3 col-12">
            <div className="mb-3 mb-lg-0 position-relative">
              <label className="form-label">
                Date d'expiration
              </label>
              <input
                className="form-control flatpickr"
                type="text"
                placeholder="Sélectionner la date"
              />
              <div className="position-absolute bottom-0 end-0 p-3 lh-1">
                <i className="bi bi-calendar text-muted" />
              </div>
            </div>
          </div>
          <div className="col-md-3 col-12">
            <div className="mb-3 mb-lg-0">
              <label className="form-label">
                Code CVV
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="312"
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <p className="mb-0 small mt-2">
        {method.description}
      </p>
    );
  };

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
          <ScrollToTop />
          <section className="mb-lg-14 mb-8 mt-8">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-12">
                  <div className="py-4">
                    <h2 className="text-inherit h5">
                      <i className="feather-icon icon-credit-card me-2 text-muted" />
                      Mode de Paiement
                    </h2>
                    <div className="mt-5">
                      {paymentMethods.map((method) => (
                        <div key={method._id} className="card card-bordered shadow-none mb-2">
                          <div className="card-body p-6">
                            <div className="d-flex">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="paymentMethod"
                                  id={`method-${method._id}`}
                                  checked={selectedMethod === method._id}
                                  onChange={() => handleMethodChange(method._id)}
                                />
                                <label
                                  className="form-check-label ms-2"
                                  htmlFor={`method-${method._id}`}
                                ></label>
                              </div>
                              <div>
                                <h5 className="mb-1 h6">
                                  {method.name}
                                </h5>
                                {renderPaymentMethodDetails(method)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="mt-5 d-flex justify-content-end">
                        <Link
                          to="/ShopCart"
                          className="btn btn-outline-gray-400 text-muted"
                        >
                          Précédent
                        </Link>
                        <button 
                          onClick={handleSubmitOrder} 
                          className="btn btn-primary ms-2"
                          disabled={!selectedMethod || cartItems.length === 0}
                        >
                          Passer la commande
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-12 offset-lg-1 col-lg-4">
                  <div className="mt-4 mt-lg-0">
                    <div className="card shadow-sm">
                      <h5 className="px-6 py-4 bg-transparent mb-0">
                        Détails de la commande
                      </h5>
                      <ul className="list-group list-group-flush">
                        {cartItems.map((item) => (
                          <li key={item.id} className="list-group-item px-4 py-3">
                            <div className="row align-items-center">
                              <div className="col-2 col-md-2">
                                <img
                                  src={`data:image/png;base64,${item.imgSrc}`}
                                  alt={item.name}
                                  className="img-fluid"
                                />
                              </div>
                              <div className="col-5 col-md-5">
                                <h6 className="mb-0">{item.name}</h6>
                                <span>
                                  <small className="text-muted">{item.price} DT</small>
                                </span>
                              </div>
                              <div className="col-2 col-md-2 text-center text-muted">
                                <span>{item.quantity}</span>
                              </div>
                              <div className="col-3 text-lg-end text-start text-md-end col-md-3">
                                <span className="fw-bold">{(item.price * item.quantity).toFixed(2)} DT</span>
                              </div>
                            </div>
                          </li>
                        ))}
                        <li className="list-group-item px-4 py-3">
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <div>Sous-total des articles</div>
                            <div className="fw-bold">{calculateTotal().toFixed(2)} DT</div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              Frais de service{" "}
                              <i
                                className="feather-icon icon-info text-muted"
                                data-bs-toggle="tooltip"
                                title="Info par défaut"
                              />
                            </div>
                            <div className="fw-bold">3.00 DT</div>
                          </div>
                        </li>
                        <li className="list-group-item px-4 py-3">
                          <div className="d-flex align-items-center justify-content-between fw-bold">
                            <div>Sous-total</div>
                            <div>{(calculateTotal() + 3).toFixed(2)} DT</div>
                          </div>
                        </li>
                      </ul>
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

export default ShopCheckOut;