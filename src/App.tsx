import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import Results from "./Results";
import Form from "./Form";
import FlightShow from "./FlightShow";
import Loader from "./helpers/Loader";

function App() {
  const navigate = useNavigate();

  return (
    <div>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/results/:flightId/*" element={<Results />} />
        <Route path="/flights/:id/*" element={<FlightShow />} />
      </Routes>
    </div>
  );
}

export default App;
