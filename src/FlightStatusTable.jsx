import { Plane } from "lucide-react";
import FlightMap from "./FlightMap";
import timeStampConvert from "./helpers/timeStampConvert";

export default function FlightStatusTable(props) {
  const { flight } = props;
  console.log(flight);

  return (
    <div className="flight-status-list flex flex-col gap-6 py-2">
      <div className="status-banner">
        <p className="text-3xl font-black  flex items-center gap-4">
          {flight?.airport?.origin?.code?.iata ?? " "}
          {/* {" > "} */}
          <Plane color="#ffffff" fill="white" strokeWidth={0.5} absoluteStrokeWidth />
          {flight?.airport?.destination?.code?.iata ?? " "}
        </p>
      </div>
      {/* {window.innerWidth <= 768 ? <FlightMap flight={flight} /> : null} */}
      <div className="status-heading-container">
        <p className="title ">{flight?.status?.text ?? ""}</p>
        {/* removing the line below for now but might bring it back but need to make it conditional */}
        {/* <p>Arrived {formatDistanceToNow(actualArrivalStamp)} ago</p> */}
      </div>
      <div className="container-status-details ">
        <div>
          <p className=" font-bold text-xl">Flight:</p>
          <p className="">
            {flight?.identification?.number?.default ?? ""}
          </p>
        </div>
        <div>
          <p className=" font-bold text-xl">Terminal:</p>
          <p className="">
            {flight?.airport?.destination?.info?.terminal ?? "N/A"}
          </p>
        </div>
        <div>
          <p className=" font-bold text-xl">Gate:</p>
          <p className=" min-h-[1.5rem]">
            {flight?.airport?.destination?.info?.gate ?? ""}
          </p>
        </div>
      </div>
      <div className="container-airline">
        <p className="font-black  text-2xl">
          {flight?.airline?.name ?? ""} ({flight?.airline?.code?.iata ?? ""})
        </p>
      </div>
      {/* <div className="container-progress-bar">
        <p>{flight.airport.origin.code.iata}</p>
        <progress max="100" value="55"></progress>
        <p>{flight.airport.destination.code.iata}</p>
      </div> */}

      <div className="container-flight-details">
        <div className="status-origin">
          <div>
            <p className="font-semibold pt-3">Origin Airport:</p>
            <p>
              {flight?.airport?.origin?.name ?? ""} (
              {flight?.airport?.origin?.code?.iata ?? ""})
            </p>
          </div>
          <div>
            <p className="font-semibold pt-3">Scheduled Departure:</p>
            <p>
              {flight?.time?.scheduled?.departure === null ||
              flight?.time?.scheduled?.departure === 0
                ? "N/A"
                : timeStampConvert(flight?.time?.scheduled?.departure)}
            </p>
          </div>
          <div>
            <p className="font-semibold pt-3">Actual Departure:</p>
            <p>
              {flight?.time?.real?.departure === null
                ? "not available"
                : timeStampConvert(flight?.time?.real?.departure)}
            </p>
          </div>
        </div>

        <div className="status-destination">
          <div>
            <p className="font-semibold pt-3">Destination Airport:</p>
            <p>
              {flight?.airport?.destination?.name ?? ""} (
              {flight?.airport?.destination?.code?.iata ?? ""})
            </p>
          </div>
          <div>
            <p className="font-semibold pt-3">Scheduled Arrival:</p>
            <p>
              {flight?.time?.scheduled?.arrival === null ||
              flight?.time?.scheduled?.arrival === 0
                ? "N/A"
                : timeStampConvert(flight?.time?.scheduled?.arrival)}
            </p>
          </div>
          <div>
            <p className="font-semibold pt-3">Actual Arrival:</p>
            <p>
              {flight?.time?.real?.arrival === null
                ? "not yet available"
                : timeStampConvert(flight?.time?.real?.arrival)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
