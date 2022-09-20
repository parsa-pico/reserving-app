import React from "react";
import { Button } from "react-bootstrap";

export default function Hero() {
  return (
    <div className="hero">
      <header className="hero__header">
        <h1 className="hero__heading">GET YOUR THERAPY SESSEION!</h1>
        <Button className="hero__button" variant="primary">
          Reserve Now
        </Button>
      </header>
    </div>
  );
}
