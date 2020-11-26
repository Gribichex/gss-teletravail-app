import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

function LogoutComponent(props) {
  const history = useHistory();

  const handleLogout = (event) => {
    localStorage.removeItem("JWT");
    props.changeAuthStatus(false);
    history.push("/login");
    event.preventDefault();
  };

  const [profile, setProfile] = useState({});
  const authToken = localStorage.getItem("JWT");
  const decodedToken = jwt_decode(authToken);

  //Fetch de la base de donnée avant chaque render et changement de l'état
  useEffect(() => {
    fetch("/api/users/" + decodedToken.email, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + authToken,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resultat) => {
        setProfile(resultat);
      })
      .catch(
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <div>
      <Container className="my-5">
        <Row>
          <Col>
            <h1 className="my-5">
              Vous êtes loggé comme {profile.firstName} {profile.lastName} (
              {profile.email})
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={handleLogout}>
              <Button className="my-5" variant="primary" type="submit">
                Logout
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LogoutComponent;
