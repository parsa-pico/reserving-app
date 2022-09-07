import ReserveBox from "./Components/ReserveBox";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import TimeBox from "./Components/TimeBox";
import Login from "./Components/Login";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ReserveBox />} />
        <Route path="add-times" element={<TimeBox />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
