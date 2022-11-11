import React, { useState, useEffect } from "react";

export default function Playground() {
  const [result, setResult] = useState();
  const [error, setError] = useState();
  function sum(a, b) {
    return a + b;
  }
  const [bool, setBool] = useState(false);
  useEffect(() => {
    if ("NDEFReader" in window) setBool(true);
  }, []);

  return (
    <div>
      {bool ? <h1>supports nfc</h1> : <h1> dosent support nfc</h1>}
      <img src="http://localhost:3000/upload/1.png" alt="" />
      <button onClick={() => setResult(sum(1, 2))}>click me</button>
      {result}
    </div>
  );
}
