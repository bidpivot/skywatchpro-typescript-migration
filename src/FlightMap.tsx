import { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Flight } from "./interfaces/FlightDetailData";
import { Feature, LineString } from "geojson";

interface FlightStatusTableProps {
  flight: Flight;
}

export default function FlightMap({ flight }: FlightStatusTableProps) {
  // const flight = props.flight;
  const [lng, setLng] = useState(flight.trail[0].lng);
  const [lat, setLat] = useState(flight.trail[0].lat);
  const apiKey = import.meta.env.VITE_REACT_APP_MAPBOX_KEY;
  mapboxgl.accessToken = apiKey;

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markerContainer = useRef<HTMLDivElement | null>(null); // Create a marker container

  // Calculate the coordinates of the origin and destination
  const originCoordinates: [number, number] = [
    flight.airport.origin.position.longitude,
    flight.airport.origin.position.latitude,
  ];
  const destinationCoordinates: [number, number] = [
    flight.airport.destination.position.longitude,
    flight.airport.destination.position.latitude,
  ];

  // Calculate the bounds for the flight path
  const bounds = new mapboxgl.LngLatBounds()
    .extend(originCoordinates)
    .extend(destinationCoordinates);

  useEffect(() => {
    // Check if the map container element is available
    if (!mapContainer.current) return;

    // Check if the map has already been initialized return if so
    if (map.current) return;

    // Initialize the Mapbox map then proceed with all the customizations of the map using Class methods
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10", // Change map style to dark-v10
    });

    // Wait for the map style to finish loading
    // Now proceed to customize map with the functions below
    map.current.on("style.load", () => {
      // Create an <img> element for the custom plane marker using a CDN location
      const imgElement = document.createElement("img");
      imgElement.src = "https://img.icons8.com/emoji/48/airplane-emoji.png";
      imgElement.alt = "";
      imgElement.style.width = "45px";
      imgElement.style.height = "45px";

      // Append the <img> element to the marker container
      markerContainer.current = document.createElement("div");
      markerContainer.current.appendChild(imgElement);

      // Set marker options with the marker container for the plane marker
      const airportMarker = new mapboxgl.Marker({
        color: "#242424",
        draggable: false,
        element: markerContainer.current, // Use the marker container as the marker element
      })
        .setLngLat([lng, lat]) // Initially set to origin
        .addTo(map.current!);

      // Create markers for the origin and destination
      const originMarker = new mapboxgl.Marker({ color: "blue" })
        .setLngLat(originCoordinates)
        .addTo(map.current!);

      const destinationMarker = new mapboxgl.Marker({ color: "green" })
        .setLngLat(destinationCoordinates)
        .addTo(map.current!);

      // Create a GeoJSON LineString feature for the flight path
      const flightPath: Feature<LineString> = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [originCoordinates, destinationCoordinates],
        },
        properties: {},
      };

      // Add the flight path LineString feature to the map
      map.current!.addSource("flight-path", {
        type: "geojson",
        data: flightPath,
      });

      map.current!.addLayer({
        id: "flight-path",
        type: "line",
        source: "flight-path",
        paint: {
          "line-color": "red",
          "line-width": 3,
        },
      });

      // Fit the map to the flight path bounds
      map.current!.fitBounds(bounds, {
        padding: 50, // Adjust padding as needed
      });
    });
  }, [flight, bounds]);

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
