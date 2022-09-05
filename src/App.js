import ReserveBox from "./Components/ReserveBox";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ReserveBox />} />
      <Route path="/test" element={<div>test</div>} />
    </Routes>
  );
}

export default App;
