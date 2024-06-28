import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Container } from "react-bootstrap";
import { config } from "../../../Constants";

var url = config.url.API_URL;

function LoginSubComponent(props) {
  const navigate = useNavigate();
  const schema = yup.object({
    email: yup
      .string()
      .email("Entrez une adresse valide")
      .required("Une adresse mail est requise"),
    password: yup
      .string()
      .required("Champs obligatoire")
      .min(8, "Au moins 8 caractères")
      .matches(/[a-z]/, "Au moins une minuscule")
      .matches(/[A-Z]/, "Au moins une majuscule")
      .matches(
        /[a-zA-Z]+[^a-zA-Z\s]+/,
        "Au moins un chiffre ou caractère spécial"
      ),
  });

  const handleLogin = (values) => {
    return new Promise((resolve, reject) => {
      fetch(url + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(
              "Erreur du serveur non disponible ou adresse e-mail/mot de passe incorrect"
            );
          }
          props.changeAuthStatus(true);
          resolve(true);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  };

  return (
    <Container className="my-5">
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          handleLogin(values)
            .then(() => {
              actions.setSubmitting(false);
              navigate("/");
            })
            .catch((error) => {
              alert(error.message);
              actions.setSubmitting(false);
            });
        }}
        initialValues={{
          email: "",
          password: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          touched,
          values,
          isValid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <h1 className="mt-5">Bonjour</h1>
            <p className="my-3">{values.email}</p>
            <Form.Row>
              <Form.Group as={Col} controlId="validationFormikUsermail">
                <Form.Label>Adresse mail</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Adresse mail"
                  aria-describedby="Adresse mail"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationFormikPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Button
              type="submit"
              variant="primary"
              style={{ backgroundColor: "rgb(36,42,117)" }}
              disabled={!isValid}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default LoginSubComponent;
