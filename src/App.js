import ReserveBox from "./Components/ReserveBox";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import AddTimeBox from "./Components/AddTimeBox";
import Login from "./Components/Login";
import LogOut from "./Components/LogOut";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ReserveBox />} />
        <Route path="add-times" element={<AddTimeBox />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<LogOut />} />
      </Routes>
    </>
  );
}

export default App;
