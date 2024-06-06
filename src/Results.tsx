import React from "react"
import { useEffect } from "react";
import CardResult from "./CardResult";
import { useParams, Link } from "react-router-dom";
import MapBox from "./MapBox";
import Loader from "./helpers/Loader";
import { useQuery } from "@tanstack/react-query";
import fetchFlightResults from "./helpers/fetchFlightResults"; 
import SearchForm from "./components/SearchForm";
import {Flight} from "./interfaces/Flight"

export default function Results() {
  const params = useParams();
  const flightId = params.flightId
  let page = 1;

  const {data: searchResults, error, isSuccess, isLoading, isError} = useQuery({
    queryKey: ['results', flightId], 
    queryFn: () => fetchFlightResults({flightId, page}),  
    refetchOnWindowFocus: false
  }) 

  //  USEEFFECT IS ONLY FOR CONSOLE LOGGING searchResults STATE
  useEffect(() => console.log({ searchResults }), [searchResults]);

  // THIS USEEFFECT IS ALSO ONLY FOR CONSOLE LOGGING LOADING STATE
  useEffect(() => console.log({ isLoading, error }), [isLoading, error]);

  if (error || isError ) {
    return <div>There was an error</div>
  }

  return (
    <div className="flex-col justify-center flex md:flex-row md:h-screen">
      {isLoading && <Loader />}

      {isSuccess && searchResults && (
        <>
          <div className="p-4"><SearchForm className="h-full"/></div>
          <div className="left-col flex-1 bg-black/20 backdrop-blur-sm">
            <div className="p-4">
              {searchResults.length !== 0 && (
                <div>
                  <h2 className="title text-white font-black">
                    Search Results
                  </h2>
                  <p className="text-zinc-200 text-sm">Found {searchResults.length} matches for "
                    {searchResults[0].identification.number.default}"</p>
                  <h2 className="text-2xl pt-4 font-semibold text-white">Choose A Date</h2>
                </div>
              )}
              {searchResults.length === 0 && (
                <div>
                  
                <h2 className="title text-light">
                  There were {searchResults.length} matches found for "
                  {params.flightId}".
                </h2>
                  <h3> Please check again your airline and flight number and try again.</h3>
                  <Link to={"/"}>Go Back To Search</Link>
                </div>
                
              )}
            </div>

            <div id="results" className="small-scrollbar mr-1 shadow-inner">
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
                      key={reg + index}
                      flight={flight}
                      id={id}
                      status={status}
                    />
                  );
                })}
            </div>
          </div>
          {/* <div className="right-col">
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
          </div> */}
        </>
      )}
    </div>
  );
}
