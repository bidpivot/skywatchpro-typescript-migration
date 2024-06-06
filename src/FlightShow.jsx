import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FlightStatusTable from "./FlightStatusTable";
import FlightMap from "./FlightMap";
import Loader from "./helpers/Loader";
import dataJson from "./json/flight-detail-response.json";
import { useQuery } from "@tanstack/react-query";

export default function FlightShow(props) {
  const params = useParams();
  const flightId = params.id
  const baseUrl = props.url;
  const apiKey = import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY;

  const {data: flight, error, isLoading, isError } = useQuery({
    queryKey: ["detail", flightId],
    queryFn: () => getFlightDetails({id: flightId, url: baseUrl}),
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  useEffect(() => console.log({ flight }), [flight]);

  async function getFlightDetails({id, url}) {
    console.log(`FETCH: for flightid:${id}`)
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
      },
    };

    try {
    const response = await fetch(`${url}/flights/detail?flight=${id}`, options)
    return response.json()
    } catch (error) {
      return error
    }
  }

  return (
    <div className="container-app">
      {(error || isError) && (
        <p>
          There was an error loading flight details. Please try again later.
        </p>
      )}
      <div className="p-2">
        <div className="bg-black/20 shadow-lg shadow-black/50 backdrop-blur-md h-full rounded-sm">
        {isLoading && <Loader />}
        {flight && <FlightStatusTable flight={flight} />}
        </div>
      </div>
      <div
        className="h-full"
        // style={{ display: window.innerWidth <= 768 ? "none" : "block" }}
      >
        {flight && <FlightMap flight={flight} />}
      </div>
    </div>
  );
}
