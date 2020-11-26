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
import TickDay from "./components/TickDay";

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
              <Row>
                <Col md>
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
                </Col>
                <Col md></Col>
                <Col md>
                  <table>
                    <tbody>
                      <tr>
                        <td>Jour sur site</td>
                        <TickDay
                          {...props}
                          key={uuidv4()}
                          indexJour={0}
                          isClickable={false}
                          status={0}
                        />
                      </tr>
                      <tr>
                        <td>Jour en télétravail</td>
                        <TickDay
                          {...props}
                          key={uuidv4()}
                          indexJour={1}
                          isClickable={false}
                          status={1}
                        />
                      </tr>
                      <tr>
                        <td>Jour de congé</td>
                        <TickDay
                          {...props}
                          key={uuidv4()}
                          indexJour={0}
                          isClickable={false}
                          status={2}
                        />
                      </tr>
                      <tr>
                        <td>Week-end</td>
                        <TickDay
                          {...props}
                          key={uuidv4()}
                          indexJour={0}
                          isClickable={false}
                          status={3}
                        />
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
            </Container>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
