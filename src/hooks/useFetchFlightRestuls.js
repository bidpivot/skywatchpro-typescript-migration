
  // const apiKey = import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY;

  //   const fetchData = async ({flightId, page}) => {
  //     console.log({flightId});
  //     // the flightId needed to make the call is passed in params from the form on the landing page
  //     const url = `https://flight-radar1.p.rapidapi.com/flights/get-more-info?query=${flightId}&fetchBy=flight&page=${page}&limit=100`;
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         "X-RapidAPI-Key": apiKey,
  //         "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
  //       },
  //     };

  //     try {
  //       const response = await fetch(url, options);
  //       if (!response.ok) {
  //         throw new Error("network issue");
  //       }
  //       const data = await response.json(); // the docs asked for .text()
  //       // this object path in the console log below is the location of the array of flight objects
  //       console.log(data.result.response.data.length);
  //       console.log({data});
  //       // the findRelevantFlights([flights]) helper function iterates over array of flights and...
  //       // filters only the flights that have a registration number
  //       // this means they are recent or imminent flights
  //       setSearchResults(() => findRelevantFlights(data.result.response.data));
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
