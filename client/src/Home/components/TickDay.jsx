import React from "react";
import styles from "./tickDay.module.css";

const TickDay = (props) => {
  const changeStatus = () => {
    if (props.isClickable) {props.updateUser(props.user, props.selectedDate, props.indexJour,props.status)}
  };

  const changeStyle = () => {
    switch (props.status) {
      case 0:
        return { background: "white" };

      case 1:
        return { background: "yellow" };

      case 2:
        return { background: "rgb(93,191,212" };
      case 3:
        return { background: "black" };

      default:
        return { background: "white" };
    }
  };


  return (
    <td className={ styles.td} onClick={changeStatus} style={changeStyle()}></td>
  );
};

export default TickDay;
