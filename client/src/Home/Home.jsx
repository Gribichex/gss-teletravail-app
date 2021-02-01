import React, { useState } from "react";
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
import addDays from "date-fns/fp/addDays";
import startOfWeek from "date-fns/fp/startOfWeek";
import HomeArray from "./components/HomeArray--week";
import { v4 as uuidv4 } from "uuid";
import TickDay from "./components/TickDay";
import Button from "react-bootstrap/Button";
import format from "date-fns/format";
import fr from "date-fns/locale/fr";
import { useHistory } from "react-router-dom";

const Home = (props) => {
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

  const history = useHistory();

  const handleRedirect = () => {
    history.push("/login");
  };

  const DateFormated = new Date(
    Date.UTC(
      selectedDate.indexOfYear,
      selectedDate.indexOfMonth,
      selectedDate.indexOfDay
    )
  );

  return (
    <Container style={{ maxWidth: "1200px" }} fluid className="mt-5">
      {props.currentAuth ? (
        <Jumbotron>
          <Row>
            <Col className="my-3 text-center">
              <MonthPicker
                key={uuidv4()}
                handleChangeDate={handleChangeDate}
                selected={DateFormated}
              />
            </Col>
          </Row>
          <Row>
            <Col className=" my-3 text-center">
              <h1>
                {format(DateFormated, "'Semaine ' ww") +
                  format(
                    addDays(1)(startOfWeek(DateFormated)),
                    "' du ' EEEE dd MMMM",
                    {
                      locale: fr,
                    }
                  ) +
                  format(
                    addDays(7)(startOfWeek(DateFormated)),
                    "' au ' EEEE dd MMMM",
                    {
                      locale: fr,
                    }
                  )}
              </h1>
            </Col>
          </Row>

          <Row>
            <Col md={9} className=" my-3">
              <HomeArray
                key={uuidv4()}
                selectedDate={selectedDate}
                currentAuth={props.currentAuth}
              />
            </Col>
            <Col className="my-4">
              <table className="table table-sm table-borderless">
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
                    <td>En mission</td>
                    <TickDay
                      {...props}
                      key={uuidv4()}
                      indexJour={0}
                      isClickable={false}
                      status={2}
                    />
                  </tr>
                  <tr>
                    <td>Jour de congé</td>
                    <TickDay
                      {...props}
                      key={uuidv4()}
                      indexJour={0}
                      isClickable={false}
                      status={3}
                    />
                  </tr>
                  <tr>
                    <td>Week-end</td>
                    <TickDay
                      {...props}
                      key={uuidv4()}
                      indexJour={0}
                      isClickable={false}
                      status={4}
                    />
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </Jumbotron>
      ) : (
        <>
          <h1 className="text-center">Il faut vous identifier !</h1>
          <p className="text-center my-5">
            <Button
              size="lg"
              variant="primary"
              style={{ backgroundColor: "rgb(36,42,117)" }}
              onClick={handleRedirect}
            >
              Login/Inscription
            </Button>
          </p>
        </>
      )}
    </Container>
  );
};

export default Home;
