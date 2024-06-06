import { useNavigate, Routes, Route } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
// 
import 'mapbox-gl/dist/mapbox-gl.css';
import './css/_base.css';
import './css/container.css';
import './css/helpers.css';
import './css/typography.css';
import './css/layouts.css';
import './css/header.css';
import './css/app-header.css';
import './css/forms.css';
import './css/avatar.css';
import './css/buttons.css';
import './css/entry.css';
import './css/nav.css';
import './css/dots.css';
import './css/slider.css';
import './css/cards.css';
import './css/card.css';
import './css/actions.css';
import './css/items.css';
import './css/pills.css';
import './css/flight-show.css';
import './css/results.css';
import './css/loader.css';
import './css/mapbox-gl.css';

// 
import Form from "./Form";
import FlightShow from "./FlightShow";
import Header from "./Header";
import Results from "./Results";
import { useState, useEffect } from "react";
import Loader from "./helpers/Loader";

function App() {
  const url = import.meta.env.VITE_REACT_APP_RAPIDAPI_URL;

  const navigate = useNavigate();

  return (
    <div>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Form />}></Route>
        <Route path="/loader" element={<Loader />}></Route>
        <Route
          path="/results/:flightId/*"
          element={<Results url={url} />}
        ></Route>
        <Route path="/flights/:id/*" element={<FlightShow url={url} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
