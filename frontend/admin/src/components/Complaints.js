import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import { getAllComplaints } from "api/ComplaintApi";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await getAllComplaints();
        if (response.success) {
          setComplaints(response.data);
        } else {
          console.error("Erreur lors de la récupération des réclamations");
        }
      } catch (error) {
        console.error("Erreur serveur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Réclamations</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Prénom</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Titre</th>
                    <th scope="col">Email</th>
                    <th scope="col">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center">Chargement...</td>
                    </tr>
                  ) : complaints.length > 0 ? (
                    complaints.map((complaint, index) => (
                      <tr key={index}>
                        <th scope="row">{complaint.firstName}</th>
                        <td>{complaint.lastName}</td>
                        <td>{complaint.title || "-"}</td>
                        <td>{complaint.email}</td>
                        <td>{complaint.message}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">Aucune réclamation trouvée.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Complaints;
