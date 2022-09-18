import React from "react";

export default function AdminTimesTable({ reservedTimes }) {
  return (
    <div>
      {reservedTimes && reservedTimes.length !== 0 && (
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">date</th>
              <th scope="col">time</th>
              <th scope="col">applicant</th>
            </tr>
          </thead>
          <tbody>
            {reservedTimes &&
              reservedTimes.map((reserveObj) => (
                <tr key={reserveObj._id}>
                  <td>{reserveObj.date}</td>
                  <td>{reserveObj.time}</td>
                  <td>{`${reserveObj.firstName} ${reserveObj.lastName}`}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
