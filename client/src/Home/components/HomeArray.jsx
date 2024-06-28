import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import UserSchedule from "./UserSchedule";
import PropTypes from "prop-types";
import compareAsc from "date-fns/compareAsc";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import fr from "date-fns/locale/fr";

import styles from "./HomeArray.module.css";
import { useNavigate } from "react-router-dom";
import { config } from "../../Constants";

let url = config.url.API_URL;
let department = config.department;

const HomeArray = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  //Fetch de la base de donnée avant chaque render et changement de l'état
  useEffect(() => {
    if (props.currentAuth) {
      fetch(url + "/api/users/?department=" + department, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          const userEmail = result.userEmail;
          let loadedData = result.foundUsers;

          loadedData.forEach((element) => {
            element.isActive = false;
          });
          const userIndex = loadedData.findIndex(
            (element) => userEmail === element.email
          );
          loadedData[userIndex].isActive = true;
          loadedData[userIndex] = loadedData.splice(
            0,
            1,
            loadedData[userIndex]
          )[0];

          setUserData(loadedData);
        })
        .catch(() => {
          navigate("/login");
        });
    }
  }, [navigate, props.currentAuth]);

  const updateUser = (user, month, indexJour, previousStatus) => {
    const userDataCopy = [...userData];
    let newStatus = (previousStatus + 1) % 4;

    const updateDate = new Date(
      Date.UTC(month.indexOfYear, month.indexOfMonth, indexJour + 1)
    );

    const userIndex = userData.findIndex(
      (element) => element.email === user.email
    );

    const jourPoseIndex = userData[userIndex].nonWorkingDays.findIndex(
      (element) => compareAsc(parseISO(element.date), updateDate) === 0
    );

    if (jourPoseIndex !== -1) {
      //Jour trouvé

      if (newStatus !== 0) {
        userDataCopy[userIndex].nonWorkingDays[jourPoseIndex] = {
          date: updateDate.toISOString(),
          status: newStatus,
        };
      } else {
        userDataCopy[userIndex].nonWorkingDays.splice(jourPoseIndex, 1);
      }
    } else {
      //Jour non trouvé

      userDataCopy[userIndex].nonWorkingDays.push({
        date: updateDate.toISOString(),
        status: newStatus,
      });
    }

    //console.log(userDataCopy);
    //console.log(JSON.stringify(userDataCopy[userIndex]));

    fetch(url + "/api/users/" + userDataCopy[userIndex].email, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        nonWorkingDays: userDataCopy[userIndex].nonWorkingDays,
      }),
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Identification rejetée");
        }
      })
      .then(() => {
        setUserData((previous) => userDataCopy);
      })
      .catch((err) => {
        navigate("/login");
        console.log(err);
      });
  };

  const renderHeaderRow = ({
    weekDay,
    indexOfDay,
    indexOfMonth,
    indexOfYear,
  }) => {
    const headerRowArray = [
      <th key={0} className={styles.th}>
        Jour de la semaine
      </th>,
    ];

    for (let i = 1; i < 8; i++) {
      let currentIndexOfDay = indexOfDay - weekDay + i;
      let currentDate = new Date(indexOfYear, indexOfMonth, currentIndexOfDay);
      let currentDateString = format(currentDate, "EE dd", { locale: fr });

      headerRowArray.push(
        <th key={i} className={styles.th}>
          {currentDateString}
        </th>
      );
    }

    return headerRowArray;
  };

  const renderTableContent = (user, selectedDate) => {
    return user.map((userElement, userIndex) => (
      <UserSchedule
        key={userIndex}
        user={userElement}
        selectedDate={selectedDate}
        updateUser={updateUser}
      />
    ));
  };

  return (
    <div>
      {userData && userData.length ? (
        <Table variant="dark" bordered hover responsive size="sm">
          <thead>
            <tr>{renderHeaderRow(props.selectedDate)}</tr>
          </thead>
          <tbody>{renderTableContent(userData, props.selectedDate)}</tbody>
        </Table>
      ) : (
        <h1>Chargement...</h1>
      )}
    </div>
  );
};

HomeArray.props = {
  currentAuth: PropTypes.bool.isRequired,
  selectedDate: PropTypes.object.isRequired,
};

export default HomeArray;
