import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { config } from "../../Constants";
var url = config.url.API_URL;

function LogoutComponent(props) {
  const handleLogout = () => {
    return fetch(url + "/auth/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status !== 200) {
            throw new Error("Erreur interne du serveur")
          }
        props.changeAuthStatus(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const [profile, setProfile] = useState("Chargement...");

  //Fetch de la base de donnée avant chaque render et changement de l'état
  useEffect(() => {
    fetch(url + "/api/users/loggeduser", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Identification rejetée");
        } else {
          return res.json();
        }
      })
      .then((resultat) => {
        setProfile(
          "Vous êtes loggé comme " +
            resultat.firstName +
            " " +
            resultat.lastName +
            " (" +
            resultat.email +
            ")"
        );
      })
      .catch(() => {
        props.changeAuthStatus(false);
      });
  }, []);

  return (
    <Container className="my-5 ">
      <Row>
        <Col className="mt-5">
          <h1 className="my-5 text-center">{profile}</h1>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button
            size="lg"
            variant="primary"
            style={{ backgroundColor: "rgb(36,42,117)" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default LogoutComponent;
