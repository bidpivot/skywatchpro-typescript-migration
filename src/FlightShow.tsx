import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FlightStatusTable from "./FlightStatusTable";
import FlightMap from "./FlightMap";
import Loader from "./helpers/Loader";
import { useQuery } from "@tanstack/react-query";
import { Flight } from "./interfaces/Flight";

export default function FlightShow() {
  const params = useParams();
  const flightId = params.id;
  const baseurl = import.meta.env.VITE_REACT_APP_RAPIDAPI_URL as string;
  const apiKey = import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY as string;

  const {
    data: flight,
    error,
    isLoading,
    isError,
  } = useQuery<Flight, Error>({
    queryKey: ["detail", flightId],
    queryFn: () => getFlightDetails(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => console.log({ flight }), [flight]);

  async function getFlightDetails(): Promise<Flight> {
    try {
      console.log(`FETCH: for flightid:${flightId}`);
      const response = await fetch(
        `${baseurl}/flights/detail?flight=${flightId}`,
        {
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Flight = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch flight details:", error);
      throw error;
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
