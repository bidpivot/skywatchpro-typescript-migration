import React from "react";
import dateConverter from "./helpers/dateConverter";
import { Link } from "react-router-dom";
import FlightData from "./interfaces/FlightCardData";

interface CardResultProps {
  flight: FlightData;
}

export default function CardResult({ flight }: CardResultProps) {
  const id = flight.identification.id;
  const status = flight.status.text;

  // console.log("CardResult:\n", { id, status });
  return (
    <div className="card-container py-[2px] p-2">
      <div className="bg-black/25 shadow-lg rounded-md w-full hover:bg-black/75 transition-all duration-300">
        <Link to={`/flights/${id}`} className="w-full h-full">
          <div className="card-header p-4">
            <p className="title--sm text-white">
              {dateConverter(flight.time.scheduled.departure)}
            </p>
            <p className="title--sm text-zinc-100">Last Update: '{status}'</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

// export default React.memo(CardResult);
