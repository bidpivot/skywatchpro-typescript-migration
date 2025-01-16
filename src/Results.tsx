import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CardResult from "./CardResult";
import MapBox from "./MapBox";
import Loader from "./components/Loader";
import fetchFlightResults from "./helpers/fetchFlightResults";
import SearchForm from "./components/SearchForm";
import FlightData from "./interfaces/FlightCardData";

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

  console.log("Results component rendered:", { flightId, page });

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
    <div className="flex-col justify-center flex md:flex-row md:h-screen">
      {isLoading && <Loader />}

      {isSuccess && searchResults && (
        <>
          <div className="p-4 form-left">
            <SearchForm className="h-full" />
          </div>
          <div className="left-col flex-1 bg-black/20 backdrop-blur-sm md:order-2">
            <div className="p-4">
              {searchResults.length !== 0 && (
                <div>
                  <h2 className="title text-white font-black">
                    Search Results
                  </h2>
                  <p className="text-zinc-200 text-sm">
                    Found {searchResults.length} matches for "
                    {searchResults[0].identification.number.default}"
                  </p>
                  <h2 className="text-2xl pt-4 font-semibold text-white">
                    Choose A Date
                  </h2>
                </div>
              )}
              {searchResults.length === 0 && (
                <div>
                  <h2 className="title text-light">
                    There were {searchResults.length} matches found for "
                    {params.flightId}".
                  </h2>
                  <h3>
                    {" "}
                    Please check again your airline and flight number and try
                    again.
                  </h3>
                  <Link to={"/"}>Go Back To Search</Link>
                </div>
              )}
            </div>

            <div
              id="results"
              className="small-scrollbar mr-1 shadow-inner space-y-4"
            >
              {searchResults.length !== 0 &&
                searchResults.map((flight, index) => {
                  const id = flight.identification.id;
                  // the id is what is needed to call the api for the flight show page but it doesn't exist for every flight result
                  // need to create some conditional rendering for show page when ID does not exist
                  const reg = flight.aircraft.registration;
                  const status = flight.status.text;
                  // console.log({key})
                  return (
                    <CardResult
                      key={flight.identification.row}
                      flight={flight}
                    />
                  );
                })}
            </div>
          </div>
          <div className="right-col flex-1 bg-black/20 backdrop-blur-sm order-last md:order-3">
            {searchResults.length > 0 ? (
              searchResults[0].airport.destination.position.longitude !==
                undefined &&
              searchResults[0].airport.destination.position.longitude !==
                null ? (
                <MapBox flight={searchResults[0]} />
              ) : (
                <p>Not available</p>
              )
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

export default Results;
