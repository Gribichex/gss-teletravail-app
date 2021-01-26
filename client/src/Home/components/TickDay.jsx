import React from "react";
import styles from "./tickDay.module.css";

const TickDay = (props) => {
  const changeStatus = () => {
    if (props.isClickable) {
      props.updateUser(
        props.user,
        props.selectedDate,
        props.indexJour,
        props.status
      );
    }
  };

  const changeStyle = () => {
    switch (props.status) {
      case 0:
        return { background: "mediumseagreen" };

      case 1:
        return { background: "gold" };

      case 2:
        return { background: "sandybrown" };
      case 3:
        return { background: "white" };
      case 4:
        return { background: "black" };
      default:
        return { background: "mediumseagreen" };
    }
  };

  return (
    <td className={styles.td} onClick={changeStatus} style={changeStyle()}></td>
  );
};

export default TickDay;
