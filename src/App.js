import ReserveBox from "./Components/ReserveBox";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import AddTimeBox from "./Components/AddTimeBox";
import Login from "./Components/Login";
import LogOut from "./Components/LogOut";
import Register from "./Components/Register";
import ConfirmEmail from "./Components/ConfirmEmail";
import NotFound from "./Components/NotFound";
import ProtectedRoute from "./Components/common/ProtectedRoute";
import Profile from "./Components/Profile";
import Home from "./Components/Home";
import { isAdmin, isNormalUser } from "./Components/common/UserControl";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<ReserveBox />} /> */}
        <Route path="/" element={<Home />} />
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
        <Route path="notFound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="notFound" />} />
      </Routes>
    </>
  );
}

export default App;
