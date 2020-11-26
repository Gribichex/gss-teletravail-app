import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MonthPicker from "../common/MonthPicker";
import getDaysInMonth from "date-fns/getDaysInMonth";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";
import HomeArray from "./components/HomeArray";
import { v4 as uuidv4 } from "uuid";

const Home = (props) => {
  const nowDate = new Date();

  const [selectedDate, setSelectedDate] = useState({
    indexOfMonth: getMonth(nowDate),
    indexOfYear: getYear(nowDate),
    nbDays: getDaysInMonth(nowDate),
  });

  const handleChangeDate = (newDate) => {
    setSelectedDate({
      indexOfMonth: getMonth(newDate),
      indexOfYear: getYear(newDate),
      nbDays: getDaysInMonth(newDate),
    });
  };
  return (
    <Container fluid className="mt-5">
      <Row className="my-5">
        <Col>
          <MonthPicker
            key={uuidv4()}
            handleChangeDate={handleChangeDate}
            selected={
              new Date(
                Date.UTC(selectedDate.indexOfYear, selectedDate.indexOfMonth)
              )
            }
          />
        </Col>
      </Row>
      <Row className="my-5">
        <Col>
          <HomeArray selectedDate={selectedDate} />
        </Col>
      </Row>
      <Row className="my-5">
        <Col>
          <Jumbotron fluid>
            <Container>
              <h1>
                {" "}
                Planning GSS{" "}
                {new Date(
                  selectedDate.indexOfYear,
                  selectedDate.indexOfMonth
                ).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                })}
              </h1>
            </Container>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
