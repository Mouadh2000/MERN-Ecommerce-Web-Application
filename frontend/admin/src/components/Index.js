import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";

import { useState, useEffect } from "react";
import classnames from "classnames";
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import { getMonthlyOrderTotals } from "api/OrderApi";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [monthlyTotals, setMonthlyTotals] = useState([]);

  useEffect(() => {
    const fetchMonthlyTotals = async () => {
      try {
        const response = await getMonthlyOrderTotals();
        if (response.success) {
          setMonthlyTotals(response.data);
        }
      } catch (error) {
        console.error("Error fetching monthly totals:", error);
      }
    };

    fetchMonthlyTotals();
  }, []);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const getMonthLabels = () => {
    return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  };

  const generateAmountData = () => {
    const monthlyAmounts = monthlyTotals.reduce((acc, curr) => {
      acc[curr.month] = curr.totalAmount;
      return acc;
    }, {});

    return getMonthLabels().map((_, index) => {
      return monthlyAmounts[index + 1] || 0;
    });
  };

  const generateOrderCountData = () => {
    const monthlyCounts = monthlyTotals.reduce((acc, curr) => {
      acc[curr.month] = curr.count;
      return acc;
    }, {});

    return getMonthLabels().map((_, index) => {
      return monthlyCounts[index + 1] || 0;
    });
  };

  const chartExample1 = {
    options: {
      scales: {
        yAxes: [
          {
            gridLines: {
              color: "rgba(0,0,0,0.5)",
              zeroLineColor: "rgba(0,0,0,0.5)",
            },
            ticks: {
              stepSize: 16,
              callback: function (value) {
                if ((value % 10)) {
                  return value+ " DT";
                }
              },
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: function (item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";

            if (data.datasets.length > 1) {
              content += label;
            }

            content += yLabel;
            return content + " DT";
          },
        },
      },
    },
    data1: (canvas) => {
      return {
        labels: getMonthLabels(),
        datasets: [
          {
            label: "Total Amount",
            data: generateAmountData(),
          },
        ],
      };
    },
  };

  const chartExample2 = {
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              stepSize: 1,
              callback: function (value) {
                if ((value % 10)) {
                  return value;
                }
              },
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: function (item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";
            if (data.datasets.length > 1) {
              content += label;
            }
            content += yLabel;
            return content;
          },
        },
      },
    },
    data: {
      labels: getMonthLabels(),
      datasets: [
        {
          label: "Total Orders",
          data: generateOrderCountData(),
          maxBarThickness: 10,
        },
      ],
    },
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">Aperçu</h6>
                    <h2 className="text-white mb-0">
                    valeur des ventes</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                    <h2 className="mb-0">Commandes Totales</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar data={chartExample2.data} options={chartExample2.options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
