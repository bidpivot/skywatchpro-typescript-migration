import { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import react from "./assets/react.svg";
import FlightData from "./interfaces/FlightCardData";
interface FlightStatusTableProps {
  flight: FlightData;
}

export default function MapBox({ flight }: FlightStatusTableProps) {
  console.log({ flight });

  const apiKey = import.meta.env.VITE_REACT_APP_MAPBOX_KEY;
  mapboxgl.accessToken = apiKey;

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markerContainer = useRef<HTMLDivElement | null>(null); // Create a marker container
  const [lng, setLng] = useState(flight.airport.destination.position.longitude);
  const [lat, setLat] = useState(flight.airport.destination.position.latitude);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    // Check if the map container element is available
    if (!mapContainer.current) return;

    // Check if the map has already been initialized return if so
    // to make sure you only intialize the map object once
    if (map.current) return;

    // Initialize the Mapbox map then proceed with all the customizations of the map using Class methods
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    // Create an <img> element for the custom marker
    const imgElement = document.createElement("img");
    imgElement.src = "https://img.icons8.com/emoji/48/airplane-emoji.png";
    imgElement.alt = "";
    imgElement.style.width = "30px";
    imgElement.style.height = "30px";

    // Append the <img> element to the marker container
    markerContainer.current = document.createElement("div");
    markerContainer.current.appendChild(imgElement);

    // Set marker options with the marker container
    const marker = new mapboxgl.Marker({
      color: "#242424",
      draggable: false,
      element: markerContainer.current,
    })
      .setLngLat([lng, lat])
      .addTo(map.current);
  }, [lng, lat, zoom]);

  useEffect(() => {
    // Resize the map when the container size changes
    if (!map.current) return;

    const resizeMap = () => {
      map.current!.resize();
    };

    window.addEventListener("resize", resizeMap);
    return () => {
      window.removeEventListener("resize", resizeMap);
    };
  }, []);

  return (
    <div
      className="map-container-wrapper"
      style={{
        width: "100%",
        height: window.innerWidth <= 768 ? "50vh" : "100vh",
      }}
    >
      <div
        ref={mapContainer}
        className="map-container"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
