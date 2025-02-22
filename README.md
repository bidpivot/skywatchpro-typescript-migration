# SkyWatchPro

This is a simple react frontend that uses a free api to find flight information about flights.

Tools used: React, React Query, MapBox API, FlightRadar1, Tailwind, Shadcn-ui, Vite

demo is hosted here: [skywatchpro.site](skywatchpro.site)

### Setup

- rename the `.env.example` file to `.env`
- fill in your [mapbox](https://www.mapbox.com/) api key and [rapidUrl](https://rapidapi.com) key
- `npm install`
- before setting is live, it's recommended to test it with a mock postman server (instructions in .env.example)

### Component Hierarchy

Here’s how the components relate to each other:

- `<Form />`
  - Wraps `<SearchForm />`
- `<Results />`
  - Wraps:
    - `<SearchForm />` (still displayed)
    - Array of `<CardResult />`
    - `<MapBox />`
- `<FlightShow />`
  - Wraps:
    - `<FlightStatusTable />`
    - `<FlightMap />`

### Description

- **Form**: Parent component for the initial search interface.
- **SearchForm**: Contains the input fields and search logic.
- **Results**: Displays search results including a list of cards and a map.
- **CardResult**: Represents individual search results.
- **MapBox**: Displays the geographical data related to the search.
- **FlightShow**: Detailed view of a selected flight.
- **FlightStatusTable**: Table displaying details of individual flights status.
- **FlightMap**: Map visualizing the flight's route and the plane's current position.
