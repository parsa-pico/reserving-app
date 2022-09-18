import React, { useEffect, useState } from "react";
import { use } from "react-router-dom";
import { app } from "./realmConfig";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate, useLocation } from "react-router-dom";
//TODO:instead of going to logout page,just show a notification for logging out
export default function LogOut() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    const prevLocation = location.state.prevLocation
      ? location.state.prevLocation
      : "/";
    navigate(prevLocation);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(true);
  }, []);
  async function handleLogOut() {
    setLoading(true);
    await app.currentUser.logOut();
    window.location = "/";
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>LogOut</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          {loading && <small>please wait...</small>}
          {!loading && (
            <Button variant="secondary" onClick={handleClose}>
              no,keep me sigend in!
            </Button>
          )}
          <Button variant="primary" onClick={handleLogOut}>
            yes,log me out!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
