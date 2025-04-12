import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MagnifyingGlass } from "react-loader-spinner";
import ScrollToTop from "../ScrollToTop";
import { getClientOrderById } from "../../Api/OrderApi";
import { useAuth } from "../../context/AuthContext";

const MyAccountOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loaderStatus, setLoaderStatus] = useState(true);
  const { currentUser } = useAuth(); 

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser.data._id) return;

      try {
        const res = await getClientOrderById(currentUser.data._id);
        if (res.success) {
          setOrders(res.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
      } finally {
        setLoaderStatus(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  return (
    <div>
      <ScrollToTop />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-8 col-12">
              <div>
                {loaderStatus ? (
                  <div className="loader-container">
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
                  <div className="p-6 p-lg-10">
                    <h2 className="mb-6">Mes Commandes</h2>
                    <div className="table-responsive border-0">
                      <table className="table mb-0 text-nowrap">
                        <thead className="table-light">
                          <tr>
                            <th className="border-0">Produit</th>
                            <th className="border-0">Date</th>
                            <th className="border-0">Articles</th>
                            <th className="border-0">Statut</th>
                            <th className="border-0">Montant</th>
                            <th className="border-0" />
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order, index) => (
                            <tr key={index}>
                              <td className="align-middle border-top-0">
                                <ul className="list-unstyled mb-0">
                                  {order.productNames
                                    .split(",")
                                    .map((name, i) => <li key={i}>Produit #{i + 1}: {name.trim()}</li>)}
                                </ul>
                              </td>
                              <td className="align-middle border-top-0">
                                {new Date(order.date).toLocaleDateString("fr-FR", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </td>
                              <td className="align-middle border-top-0">{order.itemsCount}</td>
                              <td className="align-middle border-top-0">
                                <span className="badge bg-warning">{order.status || "Inconnu"}</span>
                              </td>
                              <td className="align-middle border-top-0">
                                {order.amount.toFixed(2)} DT
                              </td>
                              <td className="text-muted align-middle border-top-0">
                                <Link to="#" className="text-inherit">
                                  <i className="feather-icon icon-eye" />
                                </Link>
                              </td>
                            </tr>
                          ))}
                          {orders.length === 0 && (
                            <tr>
                              <td colSpan="6" className="text-center">
                                Aucune commande trouvée.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyAccountOrder;
