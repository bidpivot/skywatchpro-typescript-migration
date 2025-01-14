// flight.airport.destination.position.longitude,

export interface Flight {
  identification: Identification;
  status: Status;
  aircraft: Aircraft;
  owner?: any; // If the type isn't clear, use 'any' temporarily
  airline: Airline;
  airport: Airport;
  time: Time;
  trail: Trail[];
}

interface Identification {
  id?: any;
  row: number;
  number: IdentificationNumber;
  callsign?: any;
  codeshare?: any;
}

interface IdentificationNumber {
  default: string;
  alternative?: any;
}

interface Status {
  live: boolean;
  text: string;
  icon?: any;
  estimated?: any;
  ambiguous: boolean;
  generic: StatusGeneric;
}

interface StatusGeneric {
  status: GenericStatus;
  eventTime: EventTime;
}

interface GenericStatus {
  text: string;
  type: string;
  color: string;
  diverted?: any;
}

interface EventTime {
  utc?: any;
  local?: any;
}

interface Aircraft {
  model: AircraftModel;
  hex?: any;
  registration?: any;
  serialNo?: any;
  age?: any;
  restricted?: any;
  availability: AircraftAvailability;
}

interface AircraftModel {
  code: string;
  text?: any;
}

interface AircraftAvailability {
  serialNo?: any;
  age?: any;
}

interface Airline {
  name: string;
  code: AirlineCode;
}

interface AirlineCode {
  iata: string;
  icao: string;
}

interface Airport {
  origin: AirportDetail;
  destination: AirportDetail;
  real?: any;
}

interface AirportDetail {
  name: string;
  code: AirportCode;
  position: AirportPosition;
  timezone: Timezone;
  visible: boolean;
  info: DestinationInfo;
}

interface AirportCode {
  iata: string;
  icao: string;
}

interface AirportPosition {
  latitude: number;
  longitude: number;
  country: Country;
  region: Region;
}

interface Country {
  name: string;
  code: string;
  id: number;
}

interface Region {
  city: string;
}

interface Timezone {
  name: string;
  offset: number;
  abbr: string;
  abbrName?: any;
  isDst: boolean;
}

interface Time {
  scheduled: ScheduledTime;
  real?: RealTime;
  estimated?: EstimatedTime;
  other?: OtherTimeDetails;
}

interface ScheduledTime {
  departure: number;
  arrival: number;
}

interface RealTime {
  departure?: any;
  arrival?: any;
}

interface EstimatedTime {
  departure?: any;
  arrival?: any;
}

interface OtherTimeDetails {
  eta?: any;
  updated: number;
  duration?: any;
}

interface DestinationInfo {
  terminal: string | null;
  baggage: string | null;
  gate: string | null;
}

interface Trail {
  lat: number;
  lng: number;
  alt: number;
  spd: number;
  ts: number;
  hd: number;
}
