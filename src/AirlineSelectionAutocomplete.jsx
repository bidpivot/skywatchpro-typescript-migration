import React, { useState } from "react";
import dataJson from "./json/airlines.json";
import airlineJsonFilter from "./helpers/airlineJsonFilter";

export default function AirlineSelectionAutocomplete(props) {
  const filteredAirlines = airlineJsonFilter(dataJson);
  const [selectedAirline, setSelectedAirline] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = e => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowOptions(true);
  };

  const handleOptionClick = airline => {
    setSelectedAirline(airline.Name);
    setSearchTerm("");
    setShowOptions(false);
    props.setAirline(airline.Code);
  };

  const filteredOptions = filteredAirlines.filter(airline =>
    airline.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="select-box">
      <div className={`options-container ${showOptions ? "active" : ""}`}>
        {filteredOptions.map(airline => (
          <div
            key={airline.Code}
            className="option"
            onClick={() => handleOptionClick(airline)}
          >
            {airline.Name}
          </div>
        ))}
      </div>

      <div className="selected" onClick={() => setShowOptions(!showOptions)}>
        {selectedAirline || "Select Airline"}
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Start Typing..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
