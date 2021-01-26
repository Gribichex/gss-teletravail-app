import React from "react";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import locale from "date-fns/locale/fr";

import "react-datepicker/dist/react-datepicker.css";

class ExampleCustomInput extends React.Component {
  render() {
    return (
      <Button
        variant="outline-primary"
        size="lg"
        style={{ backgroundColor: "rgb(36,42,117)", color: "white" }}
        onClick={this.props.onClick}
      >
        {this.props.value}
      </Button>
    );
  }
}

const MonthPicker = (props) => {
  const handleChangeDate = (date) => {
    props.handleChangeDate(date);
  };

  return (
    <DatePicker
      dateFormat="dd MMMM yyyy"
      locale={locale}
      selected={props.selected}
      onChange={handleChangeDate}
      popperPlacement="bottom"
      showWeekNumbers
      customInput={<ExampleCustomInput />}
    />
  );
};

export default MonthPicker;
