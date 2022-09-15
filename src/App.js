import ReserveBox from "./Components/ReserveBox";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import AddTimeBox from "./Components/AddTimeBox";
import Login from "./Components/Login";
import LogOut from "./Components/LogOut";
import Register from "./Components/Register";
import ConfirmEmail from "./Components/ConfirmEmail";
import "./App.css";
// import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ReserveBox />} />
        <Route path="add-times" element={<AddTimeBox />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<LogOut />} />
        <Route path="register" element={<Register />} />
        <Route path="register/confirmUser" element={<ConfirmEmail />} />
      </Routes>
    </>
  );
}

export default App;
