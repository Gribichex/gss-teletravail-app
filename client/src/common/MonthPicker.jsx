import React from "react";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import locale from "date-fns/locale/fr";

import "react-datepicker/dist/react-datepicker.css";

const MonthPicker = (props) => {
  const ExampleCustomInput = ({ value, onClick }) => (
    <Button
      variant="outline-primary"
      size="lg"
      style={{ backgroundColor: "rgb(36,42,117)", color: "white" }}
      onClick={onClick}
    >
      {value}
    </Button>
  );
  const handleChangeDate = (date) => {
    props.handleChangeDate(date);
  };

  return (
    <DatePicker
      dateFormat="dd MMMM yyyy"
      locale={locale}
      selected={props.selected}
      onChange={handleChangeDate}
      showWeekNumbers
      customInput={<ExampleCustomInput />}
    />
  );
};

export default MonthPicker;
