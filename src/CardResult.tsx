import React from 'react';
import dateConverter from "./helpers/dateConverter";
import { Link } from "react-router-dom";
import {Flight} from "./interfaces/Flight"

interface FlightMeta {
  flight: Flight;
  id: string;
  status: string;
}

export default function CardResult({flight, id, status}: FlightMeta) {
  // const { flight, id, reg, status } = props;

  return (
    <div className="card-container py-[2px] p-2">
      <div className="bg-black/ shadow-lg  rounded-sm w-full hover:shadow-xl">
        <Link to={`/flights/${id}`} className="w-full h-full">
          <div className="card-header p-4 hover:p-8 transition-all duration-300">
            <p className="title--sm text-white">
              {dateConverter(flight.time.scheduled.departure)}
            </p>
            <p className="title--sm text-zinc-100">Last Update: '{status}'</p>
          </div>
        </Link>
        {/* <div className="card-status-box">
          <p className="text--lg">Status:</p>
          <p className="text--lg">{flight.status.text}</p>
        </div> */}
        {/* <div className="card-cta">
          <Link to={`/flights/${id}`} className="btn btn--block text--lg">
          Get Flight Details
          </Link>
        </div> */}
        </div>
    </div>
  );
}
