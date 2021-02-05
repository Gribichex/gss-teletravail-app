import React from "react";
import TickDay from "./TickDay";
import compareAsc from "date-fns/compareAsc";
import { isWeekend } from "date-fns";
import styles from "./userSchedule.module.css";
import parseISO from 'date-fns/parseISO'


const UserSchedule = (props) => {
  
  
  
  const checkDayStatus = (indexJour, selectedDate, nonWorkingDays) => {
    let currentCaseDate = new Date(Date.UTC(
      selectedDate.indexOfYear,
      selectedDate.indexOfMonth,
      indexJour+1,  /**Attention le constructeur Date indexe les mois à 0 et les jours à 1 */
    ));

      //console.log("La date pour la case "+indexJour+" est "+currentCaseDate);

    if (isWeekend(currentCaseDate)) {
      return 4;
    }

    for (let i = 0; i < nonWorkingDays.length; i++) {

      //console.log(compareAsc(currentCaseDate, parseISO(nonWorkingDays[i].date)));
      //console.log(nonWorkingDays[i].date);
      //console.log(parseISO(nonWorkingDays[i].date));
      if (!compareAsc(currentCaseDate, parseISO(nonWorkingDays[i].date))) {
        return nonWorkingDays[i].status;
      }
    }

    return 0;

  };



  const renderRowContent = (user, selectedDate) => {
    let tickDayArray = [];
    let nonWorkingDays = user.nonWorkingDays;

     for (let i = 0; i < 7; i++) {

      let currentIndexOfDay = selectedDate.indexOfDay-selectedDate.weekDay+i;

      tickDayArray.push(
        <TickDay
          {...props}
          key={i}
          indexJour={currentIndexOfDay}
          isClickable = {checkDayStatus(currentIndexOfDay, selectedDate, nonWorkingDays)!==4 && props.user.isActive}
          status={checkDayStatus(currentIndexOfDay, selectedDate, nonWorkingDays)}
        />
      );
    }
    return tickDayArray;
  };

  return (
    <tr>
      <td className={styles.td}>
        {props.user.firstName[0]}.{props.user.lastName.charAt(0).toUpperCase() + props.user.lastName.slice(1).toLowerCase()}
      </td>
      {renderRowContent(props.user, props.selectedDate)}
    </tr>
  );
};

export default UserSchedule;
