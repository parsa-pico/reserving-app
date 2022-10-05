import { useState } from "react";
import ReserveBox from "./Components/ReserveBox";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import AddTimeBox from "./Components/AddTimeBox";
import Login from "./Components/Login";
import LogOut from "./Components/LogOut";
import Register from "./Components/Register";
import ConfirmEmail from "./Components/ConfirmEmail";
import LoadingContext from "./Components/context/LoadingContext";
import NotFound from "./Components/NotFound";
import ProtectedRoute from "./Components/common/ProtectedRoute";
import Profile from "./Components/Profile";
import Home from "./Components/Home";
import LodingSpinner from "./Components/common/LodingSpinner";
import { isAdmin, isNormalUser } from "./Components/common/UserControl";
import "./App.css";
import PaymentCallback from "./Components/callbacks/PaymentCallback";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [generalSpinner, setGeneralSpinner] = useState(false);
  return (
    <>
      <LoadingContext.Provider
        value={{ isLoading, setIsLoading, generalSpinner, setGeneralSpinner }}
      >
        {generalSpinner && <LodingSpinner />}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home isLoading={isLoading} />} />
          <Route
            path="add-times"
            element={
              <ProtectedRoute conditionFunc={isAdmin}>
                <AddTimeBox />
              </ProtectedRoute>
            }
          />
          <Route path="/reserving" element={<ReserveBox />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<LogOut />} />
          <Route path="register" element={<Register />} />
          <Route path="register/confirmUser" element={<ConfirmEmail />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute conditionFunc={isNormalUser}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="payments/callback" element={<PaymentCallback />} />
          <Route path="notFound" element={<NotFound />} />
          <Route path="*" element={<Navigate to="notFound" />} />
        </Routes>
      </LoadingContext.Provider>
    </>
  );
}

export default App;
