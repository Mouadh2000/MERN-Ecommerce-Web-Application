import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { getTotalAmount, getTotalSales } from "api/OrderApi";
import { getAdminCount } from "api/AdminApi";
import { getClientCount } from "api/ClientApi";

const Header = () => {
  const [profit, setProfit] = useState(0);
  const [sales, setSales] = useState(0);
  const [admins, setAdmins] = useState(0);
  const [clients, setClients] = useState(0);

  useEffect(() => {
    const fetchProfit = async () => {
      try {
        const response = await getTotalAmount();
        setProfit(response.data.total || 0);
      } catch (error) {
        console.error("Error fetching profit:", error);
      }
    };
    const fetchSales = async () => {
      try {
        const response = await getTotalSales();
        setSales(response.data.totalQuantity || 0);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };
    const fetchCountAdmins = async () => {
      try {
        const response = await getAdminCount();
        setAdmins(response.data.count || 0);
      } catch (error) {
        console.error("Error fetching admin count:", error);
      }
    };
    const fetchCountClients = async () => {
      try {
        const response = await getClientCount();
        setClients(response.data.count || 0);
      } catch (error) {
        console.error("Error fetching client count:", error);
      }
    };

    fetchCountClients();
    fetchCountAdmins();
    fetchProfit();
    fetchSales();
  }, []);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-5"
                        >
                          Membres
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{admins}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-users-gear" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-5"
                        >
                          Ventes
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{sales}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-5"
                        >
                          Clients
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{clients}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-5"
                        >
                          Profit
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {profit} DT
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
