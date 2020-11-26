import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useFormikContext, Formik } from "formik";
import * as yup from "yup";
import { Container } from "react-bootstrap";

function LoginComponent(props) {
  const history = useHistory();

  const [isRegistered, setIsRegistered] = useState(false);
  const schema = yup.object({
    fName: yup.string().when("$isRegistered", {
      is: true,
      then: yup.string().required("obligatoire"),
    }),
    lName: yup.string().when("$isRegistered", {
      is: true,
      then: yup.string().required("obligatoire"),
    }),
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
    passwordConfirm: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Les mots de passe doivent être identiques"
      ),
  });
  const CheckMailExistence = () => {
    const { values } = useFormikContext();

    useEffect(() => {
      if (values.email !== "") {
        fetch("/api/users/status/" + values.email)
          .then((res) => res.json())
          .then(
            (result) => {
              if (result !== undefined) {
                setIsRegistered(result.userExist);
              }
            },
            (error) => {
              console.log(error);
            }
          );
      }
    });

    return null;
  };

  const handleRegister = (values) => {
    return new Promise((resolve, reject) => {
      fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.fName,
          lastName: values.lName,
          email: values.email,
          department: "GSS",
          password: values.password,
          nonWorkingDays: [],
        }),
      })
        .then((response) => response.json())
        .then((data) => localStorage.setItem("JWT", data.token))
        .then(() => {
          props.changeAuthStatus(true);
          resolve(true);
        })
        .catch((err) => {
          reject(
            new Error("Problème lors de l'enregistrement du nouvel utilisateur")
          );
        });
    });
  };

  const handleLogin = (values) => {
    return new Promise((resolve, reject) => {
      fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => localStorage.setItem("JWT", data.token))
        .then(() => {
          props.changeAuthStatus(true);
          resolve(true);
        })
        .catch((err) => {
          reject(new Error("Mauvais mot de passe"));
        });
    });
  };

  return (
    <Container className="my-5">
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          if (isRegistered) {
            handleLogin(values)
              .then(() => {
                actions.setSubmitting(false);
                history.push("/");
              })
              .catch((error) => {
                actions.setFieldError("password", error.message);
                actions.setSubmitting(false);
              });
          } else {
            handleRegister(values)
              .then(() => {
                actions.setSubmitting(false);
                history.push("/");
              })
              .catch((error) => {
                alert(error.message);
                actions.setSubmitting(false);
              });
          }
        }}
        initialValues={{
          fName: "",
          lName: "",
          email: "",
          password: "",
          passwordConfirm: "",
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
            <h1 className="mt-5">
              Bonjour {values.fName} {values.lName}
            </h1>
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

            {!isRegistered ? (
              <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationFormikFname">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    type="text"
                    name="fName"
                    value={values.fName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.fName && errors.fName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationFormikLname">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    name="lName"
                    value={values.lName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.lName && errors.lName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
            ) : null}

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

              {!isRegistered ? (
                <Form.Group
                  as={Col}
                  md="6"
                  controlId="validationFormikPasswordConfirm"
                >
                  <Form.Label>Confirmation du mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    name="passwordConfirm"
                    value={values.passwordConfirm}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={
                      touched.passwordConfirm && errors.passwordConfirm
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.passwordConfirm}
                  </Form.Control.Feedback>
                </Form.Group>
              ) : null}
            </Form.Row>
            <Button
              type="submit"
              variant="primary"
              disabled={isValid ? false : true}
            >
              {!isRegistered ? "Inscription" : "Login"}
            </Button>
            <CheckMailExistence />
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default LoginComponent;
