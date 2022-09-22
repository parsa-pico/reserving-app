import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import ReserveTimeService from "../services/ReserveTimeService";
export default function Cards() {
  const [admins, setAdmins] = useState([]);
  async function getAdmins() {
    const result = await ReserveTimeService.getAdmins();
    setAdmins(result);
  }
  useEffect(() => {
    getAdmins();
  });
  return (
    <Container>
      <header>
        <h1>Choose your therapist</h1>
      </header>
      <div className="grid grid--1x3">
        {admins.map((admin) => (
          <Card fullName={admin.firstName + " " + admin.lastName} />
        ))}
      </div>
    </Container>
  );
}
