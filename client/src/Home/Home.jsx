import React, { useState, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import MonthPicker from "./components/MonthPicker";
import HomeArray from "./components/HomeArray";
import TickDay from "./components/TickDay";
import { useNavigate } from "react-router-dom";
import {
  getDaysInMonth,
  getMonth,
  getYear,
  getDate,
  getDay,
  addDays,
  startOfWeek,
  format,
} from "date-fns";
import { fr } from "date-fns/locale";

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

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  };

  const DateFormated = useMemo(
    () =>
      new Date(
        Date.UTC(
          selectedDate.indexOfYear,
          selectedDate.indexOfMonth,
          selectedDate.indexOfDay
        )
      ),
    [selectedDate]
  );

  const weekFormatted = useMemo(() => {
    const weekStart = startOfWeek(DateFormated);
    const weekEnd = addDays(weekStart, 6);
    return `Semaine ${format(DateFormated, "ww")} du ${format(
      weekStart,
      "EEEE dd MMMM",
      { locale: fr }
    )} au ${format(weekEnd, "EEEE dd MMMM", { locale: fr })}`;
  }, [DateFormated]);

  return (
    <Container style={{ maxWidth: "1200px" }} fluid className="mt-5">
      {props.currentAuth ? (
        <div className="p-5 mb-4 bg-light rounded-3">
          {" "}
          {/* Replacement for Jumbotron */}
          <Row>
            <Col className="my-3 text-center">
              <MonthPicker
                handleChangeDate={handleChangeDate}
                selected={DateFormated}
              />
            </Col>
          </Row>
          <Row>
            <Col className=" my-3 text-center">
              <h1>{weekFormatted}</h1>
            </Col>
          </Row>
          <Row>
            <Col md={9} className=" my-3">
              <HomeArray
                selectedDate={selectedDate}
                currentAuth={props.currentAuth}
              />
            </Col>
            <Col className="my-4">
              <table className="table table-sm table-borderless">
                <tbody>
                  {[
                    { label: "Jour sur site", status: 0 },
                    { label: "Jour en télétravail", status: 1 },
                    { label: "En mission", status: 2 },
                    { label: "Jour de congé", status: 3 },
                    { label: "Week-end", status: 4 },
                  ].map((item, index) => (
                    <tr key={index}>
                      <td>{item.label}</td>
                      <TickDay
                        {...props}
                        indexJour={0}
                        isClickable={false}
                        status={item.status}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
        </div>
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
