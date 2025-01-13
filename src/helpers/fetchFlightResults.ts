import findRelevantFlights from "./findRelevantFlights";
const apiKey = import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY as string;
const base = import.meta.env.VITE_REACT_APP_RAPIDAPI_URL as string;

async function fetchFlightResults(
  flightId: string,
  page: string
): Promise<any[]> {
  const base = import.meta.env.VITE_REACT_APP_RAPIDAPI_URL as string;
  const apiKey = import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY as string;

  const url = `${base}/flights/get-more-info?query=${flightId}&fetchBy=flight&page=${page}&limit=100`;
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
    const data = await response.json();
    if (!data?.result?.response?.data) {
      return [];
    } else {
      console.log({ data });
      const searchResults = findRelevantFlights(data.result.response.data);
      return searchResults;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default fetchFlightResults;
