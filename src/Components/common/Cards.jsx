import React, { useEffect, useState, useContext } from "react";
import Card from "./Card";
import Container from "react-bootstrap/Container";
import ReserveTimeService from "../services/ReserveTimeService";
import LoadingContext from "../context/LoadingContext";
import { isUser } from "./UserControl";
export default function Cards() {
  const [admins, setAdmins] = useState([]);
  const LoadingState = useContext(LoadingContext);

  async function getAdmins() {
    try {
      LoadingState.setIsLoading(true);
      const result = await ReserveTimeService.getAdmins();
      setAdmins(result);
      LoadingState.setIsLoading(false);
    } catch (error) {
      if (isUser()) alert(error);
      LoadingState.setIsLoading(false);
    }
  }

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <Container>
      <header>
        <h1>Choose your therapist</h1>
      </header>
      <div className={"grid grid--1x3 "}>
        {admins.map((admin) => (
          <Card
            key={admin._id}
            fullName={admin.firstName + " " + admin.lastName}
          />
        ))}
      </div>
    </Container>
  );
}
