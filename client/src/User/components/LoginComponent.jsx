import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import LoginSubComponent from "./LoginSubComponents/LoginSubComponent";
import RegisterSubComponent from "./LoginSubComponents/RegisterSubComponent";

function IdentificationComponent(props) {
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Identification", value: "1" },
    { name: "Inscription", value: "2" },
  ];
  return (
    <Container className="my-5">
      <ButtonGroup className="text-center d-block" toggle>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            size="lg"
            variant="primary"
            style={{ backgroundColor: "rgb(36,42,117)" }}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      {radioValue === "1" ? (
        <LoginSubComponent
          changeAuthStatus={props.changeAuthStatus}
          currentAuth={props.currentAuth}
        />
      ) : (
        <RegisterSubComponent
          changeAuthStatus={props.changeAuthStatus}
          currentAuth={props.currentAuth}
        />
      )}
    </Container>
  );
}

export default IdentificationComponent;
