import React, { useEffect, useState, useContext } from "react";
import Card from "./Card";
import Container from "react-bootstrap/Container";
import ReserveTimeService from "../services/ReserveTimeService";
import LoadingContext from "../context/LoadingContext";
import { isUser } from "./UserControl";
import { useNavigate, useLocation } from "react-router-dom";
export default function Cards() {
  const therapistsLink = "/therapists";
  const windowWidth = window.innerWidth;
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname: currentPath } = location;
  const [admins, setAdmins] = useState([]);
  const LoadingState = useContext(LoadingContext);
  // TODO:get only 6 admins from data base
  // TODO:or get all admins and save them to prevent calling database again
  function getMaxAdminIndex() {
    if (windowWidth < 768) return 2;
    if (windowWidth < 1024) return 4;
    return 6;
  }
  async function getAdmins() {
    try {
      LoadingState.setGeneralSpinner(true);
      let result = await ReserveTimeService.getAdmins();
      if (currentPath === "/") {
        result = result.slice(0, getMaxAdminIndex());
      }
      setAdmins(result);
      LoadingState.setGeneralSpinner(false);
    } catch (error) {
      if (isUser()) alert(error);
      LoadingState.setGeneralSpinner(false);
    }
  }

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <section>
      <Container className="cards__container">
        <header>
          <h1>Choose your therapist</h1>
        </header>
        <div className={"grid grid--1x3 cards "}>
          {admins.map((admin) => (
            <Card
              key={admin._id}
              adminId={admin._id}
              fullName={admin.firstName + " " + admin.lastName}
            />
          ))}
        </div>

        {currentPath === "/" && (
          <button
            onClick={() => navigate(therapistsLink)}
            className="btn btn-primary w-100 fs-5 card__btn"
          >
            <b>Show all therapists</b>
          </button>
        )}
        {currentPath === "/" && <div className="card--overlay"></div>}
      </Container>
    </section>
  );
}
