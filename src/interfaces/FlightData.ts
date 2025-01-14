// this is the interface for

interface FlightData {
  identification: {
    id: number | null;
    row: number;
    number: {
      default: string;
      alternative: string | null;
    };
    callsign: string | null;
    codeshare: string | null;
  };
  status: {
    live: boolean;
    text: string;
    icon: string | null;
    estimated: string | null;
    ambiguous: boolean;
    generic: {
      status: {
        text: string;
        type: string;
        color: string;
        diverted: string | null;
      };
      eventTime: {
        utc: number | null;
        local: number | null;
      };
    };
  };
  aircraft: {
    model: {
      code: string;
      text: string | null;
    };
    hex: string | null;
    registration: string | null;
    serialNo: string | null;
    age: number | null;
    restricted: boolean | null;
    availability: {
      serialNo: string | null;
      age: number | null;
    };
  };
  owner: string | null;
  airline: {
    name: string;
    code: {
      iata: string;
      icao: string;
    };
  };
  airport: {
    origin: {
      name: string;
      code: {
        iata: string;
        icao: string;
      };
      position: {
        latitude: number;
        longitude: number;
        country: {
          name: string;
          code: string;
          id: number;
        };
        region: {
          city: string;
        };
      };
      timezone: {
        name: string;
        offset: number;
        abbr: string;
        abbrName: string;
        isDst: boolean;
      };
      visible: boolean;
    };
    destination: Destination;
    real: string | null;
  };
  time: {
    scheduled: {
      departure: number;
      arrival: number;
    };
    real: {
      departure: number | null;
      arrival: number | null;
    };
    estimated: {
      departure: number | null;
      arrival: number | null;
    };
    other: {
      eta: number | null;
      updated: number;
      duration: number | null;
    };
  };
}

interface Destination {
  name: string;
  code: {
    iata: string;
    icao: string;
  };
  position: {
    latitude: number;
    longitude: number;
    country: {
      name: string;
      code: string;
      id: number;
    };
    region: {
      city: string;
    };
  };
  timezone: {
    name: string;
    offset: number;
    abbr: string;
    abbrName: string | null;
    isDst: boolean;
  };
  visible: boolean;
}

export default FlightData;
