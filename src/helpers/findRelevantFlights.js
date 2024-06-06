import timeConverter from "./timeConverter";
import dateConverter from "./dateConverter";
export default function findRelevantFlights(resultsArray) {
  console.log(
    `response JSON contains ${resultsArray.length} items in the flights array`
  );
  const reducedArray = resultsArray.filter(flight => {
    const arrivalDate = dateConverter(flight.time.scheduled.arrival);
    const arrivalTime = timeConverter(flight.time.scheduled.arrival);
    const scheduledArrival = `${arrivalDate} at ${arrivalTime}`;
    console.log({ scheduledArrival });

    const registration = flight.aircraft.registration;
    const id = flight.identification.id;

    if (id) {
      return flight;
    }
  });
  return reducedArray;
}
