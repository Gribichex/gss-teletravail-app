import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MonthPicker from "../common/MonthPicker";
import getDaysInMonth from "date-fns/getDaysInMonth";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";
import getDate from "date-fns/getDate";
import getDay from "date-fns/getDay";
import addDays from 'date-fns/fp/addDays'
import startOfWeek from "date-fns/fp/startOfWeek";
import HomeArray from "./components/HomeArray--week";
import { v4 as uuidv4 } from "uuid";
import TickDay from "./components/TickDay";
import { useHistory } from "react-router-dom";
import format from "date-fns/format";
import fr from "date-fns/locale/fr";

const Home = (props) => {
  const history = useHistory();

  useEffect(() => {
    if (!props.currentAuth) {
      history.push("/login");
    }
  }, []);

  const nowDate = new Date();
  const [selectedDate, setSelectedDate] = useState({
    weekDay: getDay(nowDate),
    indexOfDay: getDate(nowDate),
    indexOfMonth: getMonth(nowDate),
    indexOfYear: getYear(nowDate),
    nbDays: getDaysInMonth(nowDate),
  });

  const handleChangeDate = (newDate) => {
    setSelectedDate({
      weekDay: getDay(newDate),
      indexOfDay: getDate(newDate),
      indexOfMonth: getMonth(newDate),
      indexOfYear: getYear(newDate),
      nbDays: getDaysInMonth(newDate),
    });
  };

  const DateFormated = new Date(
    Date.UTC(
      selectedDate.indexOfYear,
      selectedDate.indexOfMonth,
      selectedDate.indexOfDay
    )
  );

  return (
    <Container fluid className="mt-5">
      <Row className="my-5">
        <Col className="text-center m-3">
          <MonthPicker
            key={uuidv4()}
            handleChangeDate={handleChangeDate}
            selected={DateFormated}
          />
        </Col>
        <Col className="text-center m-3">
          <h1>
            {format(DateFormated, "'Semaine ' ww") +
              format(addDays(1)(startOfWeek(DateFormated)), "' du ' EEEE dd MMMM", {
                locale: fr,
              }) +
              format(addDays(7)(startOfWeek(DateFormated)), "' au ' EEEE dd MMMM", {
                locale: fr,
              })}
          </h1>
        </Col>
      </Row>
      <Row className="my-5">
        <Col>
          <HomeArray
            key={uuidv4()}
            selectedDate={selectedDate}
            currentAuth={props.currentAuth}
          />
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
