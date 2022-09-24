import React from "react";

export default function UserTimesTable({ reservedTimes }) {
  console.log(reservedTimes);
  return (
    <div>
      {reservedTimes && reservedTimes.length !== 0 && (
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">date</th>
              <th scope="col">time</th>
              <th scope="col">therapist</th>
            </tr>
          </thead>
          <tbody>
            {reservedTimes &&
              reservedTimes.map((reserveObj) => (
                <tr key={reserveObj._id}>
                  <td>{reserveObj.date}</td>
                  <td>{reserveObj.time}</td>
                  <td>{reserveObj.adminName}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
