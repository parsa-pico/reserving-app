import React from "react";
import Card from "./Card";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
export default function Cards() {
  return (
    <Container>
      <header>
        <h1>Choose your therapist</h1>
      </header>
      <Row>
        <Col lg={true} className="p-0">
          <Card />
        </Col>
        <Col lg={true} className="p-0">
          <Card />
        </Col>
        <Col lg={true} className="p-0">
          <Card />
        </Col>
      </Row>
    </Container>
  );
}
