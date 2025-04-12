import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { getAllOrders, } from "api/OrderApi";
import moment from "moment"; // Make sure to install moment or format dates manually

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders()
      .then((res) => {
        if (res.success) {
          setOrders(res.data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
      });
  }, []);

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "warning"; // orange
      case "shipped":
        return "success"; // green
      case "canceled":
        return "danger"; // red
      default:
        return "secondary";
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Commandes</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">transaction Id</th>
                    <th scope="col">Email du client</th>
                    <th scope="col">numéro de téléphone	du client</th>
                    <th scope="col">Produits Commandés</th>
                    <th scope="col">Status de Commandes</th>
                    <th scope="col">Méthode de Paiment</th>
                    <th scope="col">Date de Paiment</th>
                    <th scope="col">Montant</th>
                    <th scope="col">Date de Commandes</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.payment?.transactionId || "—"}</td>
                      <td>{order.client?.email}</td>
                      <td>{order.client?.phoneNumber}</td>
                      <td>
                        <ul style={{ paddingLeft: "1.2rem", marginBottom: 0 }}>
                          {order.orderItems.map((item) => (
                            <li key={item._id}>{item.product?.name} x {item.quantity}</li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        <Badge color={getStatusBadgeColor(order.orderStatus.status)}>
                          {order.orderStatus.status}
                        </Badge>
                      </td>
                      <td>{order.payment?.paymentMethod?.name || "—"}</td>
                      <td>{moment(order.payment?.paymentDate).format("YYYY-MM-DD HH:mm")}</td>
                      <td>{order.totalAmount} TND</td>
                      <td>{moment(order.createdAt).format("YYYY-MM-DD HH:mm")}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Orders;
