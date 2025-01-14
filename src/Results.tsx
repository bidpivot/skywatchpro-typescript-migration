import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CardResult from "./CardResult";
import MapBox from "./MapBox";
import Loader from "./helpers/Loader";
import fetchFlightResults from "./helpers/fetchFlightResults";
import SearchForm from "./components/SearchForm";
import FlightData from "./interfaces/FlightData";

interface Params {
  flightId: string;
  // the flightId is a concatenation of the airline + flight number in the params
  // it's generated from this navigation:  `/results/${airline}${flightNumber}`
  [key: string]: string | undefined;
}

function Results(): JSX.Element {
  const params = useParams<Params>();
  const flightId = params.flightId;
  let page = "1";

  const {
    data: searchResults,
    error,
    isSuccess,
    isLoading,
    isError,
  } = useQuery<FlightData[], Error>({
    queryKey: ["results", flightId],
    queryFn: () => {
      if (flightId) {
        return fetchFlightResults(flightId, page);
      } else {
        return Promise.reject(new Error("Flight ID is not in params"));
      }
    },
    refetchOnWindowFocus: false,
  });

  // USEEFFECT IS ONLY FOR CONSOLE LOGGING searchResults STATE
  // comment this out or delete it before deployment
  useEffect(() => {
    console.log({ searchResults });
  }, [searchResults]);

  // THIS USEEFFECT IS ALSO ONLY FOR CONSOLE LOGGING LOADING STATE
  // comment this out or delete it before deployment
  useEffect(() => {
    console.log({ isLoading, error });
  }, [isLoading, error]);

  if (error || isError) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <SearchForm />
      {isSuccess && searchResults && searchResults.length > 0 ? (
        searchResults.map(flight => (
          <CardResult key={flight.identification.row} flight={flight} />
        ))
      ) : (
        <p>No results found.</p>
      )}
      <MapBox flight={searchResults[0]} />
    </div>
  );
}

export default Results;
