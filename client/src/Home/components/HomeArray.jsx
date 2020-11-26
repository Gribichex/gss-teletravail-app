import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import UserSchedule from "./UserSchedule";
import { v4 as uuidv4 } from "uuid";
import compareAsc from "date-fns/compareAsc";
import parseISO from "date-fns/parseISO";
import jwt_decode from "jwt-decode";


const HomeArray = (props) => {
  const [userData, setUserData] = useState([]);
  let authToken = localStorage.getItem("JWT");
  const decodedToken = jwt_decode(authToken);

  //Fetch de la base de donnée avant chaque render et changement de l'état
  useEffect(() => {
    let department = "GSS";

    fetch("/api/users/?department=" + department, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + authToken,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {

         result.forEach((element)=>{
           element.isActive = false;
         })
         const userIndex =  result.findIndex((element)=>decodedToken.email===element.email)
         result[userIndex].isActive = true;
         result[userIndex] = result.splice(0, 1, result[userIndex])[0];

          setUserData(result);

      //creation des stats
         /*
         nbDays = props.selectedDate.nbDays;

          for (let i = 0; i < nbDays; i++) {
            let currentDate = new Date(
              Date.UTC(month.indexOfYear, month.indexOfMonth, indexJour + 1)
            );
          }

          const reducer = (accumulator, currentValue, idx) =>
            accumulator + currentValue.nonWorkingDays[idx];

          result;
          let chartData = result.map((element) => {
            return element.isActive;*/

            //{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }*/


        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          console.log(error);
        }
      );
  },[]);

  const updateUser = (user, month, indexJour, previousStatus) => {
    const userDataCopy = [...userData];

    let newStatus = (previousStatus + 1) % 3;

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

    fetch("/api/users/" + userDataCopy[userIndex].email, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },

      body: JSON.stringify({
        nonWorkingDays: userDataCopy[userIndex].nonWorkingDays,
      }),
    }).catch(function (err) {
      console.log(err);
    });

    setUserData((previous) => userDataCopy);
  };

  const renderHeaderRow = (nbDays) => {
    const headerRowArray = [<th key={uuidv4()}>Jour du Mois</th>];

    for (let i = 0; i < nbDays; i++) {
      headerRowArray.push(<th key={uuidv4()}>{i + 1}</th>);
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
    <Table bordered hover responsive size="sm">
      <thead>
        <tr>{renderHeaderRow(props.selectedDate.nbDays)}</tr>
      </thead>
      <tbody>{renderTableContent(userData, props.selectedDate)}</tbody>
    </Table>
  );
};

export default HomeArray;
