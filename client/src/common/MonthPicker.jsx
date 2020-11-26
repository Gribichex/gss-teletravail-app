import React, { useState } from "react";
import DatePicker from "react-datepicker";

import locale from 'date-fns/locale/fr'
 
import "react-datepicker/dist/react-datepicker.css";
 
 
const MonthPicker = (props) => {
  

  const handleChangeDate = (date) =>{
    
    props.handleChangeDate(date);
    
  }

  return (
    <DatePicker dateFormat="MMMM yyyy" locale={locale} selected={props.selected} onChange={handleChangeDate} showMonthYearPicker />
  );
};

export default MonthPicker;
