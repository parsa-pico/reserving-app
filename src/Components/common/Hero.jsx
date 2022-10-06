import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  function buttonAction() {
    navigate("/reserving");
  }
  return (
    <section className="hero">
      <header className="hero__header">
        <h1 className="hero__heading">EVERY ONE NEEDS TO BE HEARD</h1>
        <Button
          onClick={buttonAction}
          className="hero__button"
          variant="primary"
        >
          Reserve Now
        </Button>
      </header>
    </section>
  );
}
