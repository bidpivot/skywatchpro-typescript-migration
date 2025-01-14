import dataJson from "./json/airlines.json";
import airlineJsonFilter from "./helpers/airlineJsonFilter";

export default function AirlineSelection(props) {
  // the imported json helper function removes all the airlines that don't have a code
  // the code is required to search for flight details so it will cause an error if someone selects an airline that doesn't have a code
  const filtered = airlineJsonFilter(dataJson);
  // this filtered list of airlines is what is used to create the  <select><option> list

  return (
    <>
      <label htmlFor="airline" aria-describedby="airline input"></label>
      <select
        value={props.airline}
        onChange={e => props.setAirline(e.target.value)}
        required
      >
        <option key="999999999" value="">
          Select Airline
        </option>
        {filtered.map((airline, index) => {
          return (
            <option key={index} value={airline.Code}>
              {airline.Name}
            </option>
          );
        })}
      </select>
    </>
  );
}
