import React, { useState } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import { Button, Image } from "react-bootstrap";
import doctor1 from "../../images/doctorImages/doctor1.webp";
export default function Card({ fullName, image }) {
  const baseCardClass = "card text-center p-5";
  const expandedCardClass = baseCardClass + " card--expanded";
  const [cardClass, setCardClass] = useState(baseCardClass);

  return (
    <>
      <div className={cardClass}>
        <CloseButton
          variant="white"
          onClick={() => setCardClass(baseCardClass)}
          className="card__close-btn"
        />
        <div className="col ">
          <div className="card__picture m-3 ">
            <Image
              onClick={() => setCardClass(expandedCardClass)}
              className="card__image"
              src={doctor1}
              roundedCircle
              fluid
            />
          </div>
          <div className="card__description">
            <h3 className="card__title">{fullName}</h3>
            <p className="card__text">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <hr className="card__hr" />
        <div className=" vr card__line "></div>
        <div className=" card__details col">
          <h4 className="card__details-header">Degree</h4>
          <p>Lorem, ipsum dolor.</p>
          <h4 className="card__details-header">Speciality</h4>
          <p>Lorem, ipsum dolor.</p>
        </div>
        <Button className="card__reserve-btn">
          Reserve time with this person
        </Button>
      </div>
    </>
  );
}
