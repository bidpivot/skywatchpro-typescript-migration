import findRelevantFlights from "./findRelevantFlights";
const apiKey = import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY;

export default async function fetchFlightResults({ flightId, page }) {
  console.log(`FETCH: getting search results for ${flightId}`);
  // the flightId needed to make the call is passed in params from the form on the landing page and then passed to useQuery fn
  const url = `https://flight-radar1.p.rapidapi.com/flights/get-more-info?query=${flightId}&fetchBy=flight&page=${page}&limit=100`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("network issue");
    }
    const data = await response.json(); // the docs asked for .text()
    // this object path in the console log below is the location of the array of flight objects
    if (!data?.result?.response?.data) { // Corrected the typo here
      return []
    } else {
      console.log({ data });
      // the findRelevantFlights([flights]) helper function iterates over the array of flights and...
      // filters only the flights that have a registration number
      // this means they are recent or imminent flights
      const searchResults = findRelevantFlights(data.result.response.data);
      // note: searchResults will be called 'data' by react query when I call the useQuery hook on the component
      return searchResults;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}
