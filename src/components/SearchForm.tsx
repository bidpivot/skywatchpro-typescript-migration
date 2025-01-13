import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AirlineInput } from "./AirlineInput";

interface SearchFormProps {
  className?: string;
}

function SearchForm({ className }: SearchFormProps): JSX.Element {
  const [airline, setAirline] = useState<string>("");
  const [flightNumber, setFlightNumber] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ airline });
  }, [airline]);

  function handleFormSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!airline) {
      alert("Please select an Airline.");
      return;
    }
    navigate(`/results/${airline}${flightNumber}`);
  }

  function handleFlightNumberChange(e: ChangeEvent<HTMLInputElement>): void {
    setFlightNumber(e.target.value);
  }

  return (
    <div
      className={
        "bg-black/30 rounded-sm text-center text-white backdrop-blur-lg p-4 " +
        className
      }
    >
      <h1 className="title--lg font-black">SkyWatchPro</h1>
      <hr style={{ width: "100%" }} />

      <form className="form" onSubmit={handleFormSubmit}>
        <h2 className="title--sm py-6 font-bold text-left">
          Enter Flight Info
        </h2>
        <div className="input-container">
          <div className="form-line">
            {/* <AirlineSelection /> */}
            <label htmlFor="flightNumber">
              Flight Number:
              <input
                type="text"
                id="flightNumber"
                value={flightNumber}
                placeholder="Flight Number"
                required
                onChange={handleFlightNumberChange}
              />
            </label>
          </div>
          <div className="form-line">
            <span className="search-submit-btn-container">
              <button
                type="submit"
                className="bg-black/50 p-4 hover:bg-black/70 transition-colors duration-300 rounded-sm"
              >
                Search
              </button>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
