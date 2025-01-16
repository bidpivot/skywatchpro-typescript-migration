// this helper function removes all the airlines that don't have a code
// the code is required to search for flight detail and status so it will cause an error if someone selects an airline that doesn't have a code
// this filtered list of airlines is what is used to create the  <select><option> list

interface Airline {
  Code: string;
  [key: string]: any; // Allow other properties
}

interface JsonData {
  rows: Airline[];
}

export default function airlineJsonFilter(json: JsonData): Airline[] {
  return json.rows.filter(airline => {
    return airline.Code !== "";
  });
}

// this is the function before converting to TS

// export default function airlineJsonFilter(json) {
//   return json.rows.filter(airline => {
//     return airline.Code !== "";
//   });
// }
