import dataJson from "../json/airlines.json";

export default function airlineJsonFilter(json) {
  return json.rows.filter(airline => {
    return airline.Code !== "";
  });
}
