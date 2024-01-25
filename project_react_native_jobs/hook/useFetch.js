
import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": 'KJwZZIJSFimshuivMSVGaiYzkRomp15f2vkjsnk4bkzuUzVLzA',
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;

// import { useState, useEffect } from "react";
// import axios from "axios";
// // import { RAPID_API_KEY } from "@env";

// // const rapidApiKey = RAPID_API_KEY;
// const useFetch = (endpoint, query) => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const maxRetries = 3; // Set the maximum number of retries
//   const initialDelay = 1000; // Set the initial delay in milliseconds

//   const options = {
//     method: 'GET',
//     url: `https://jsearch.p.rapidapi.com/${endpoint}`,
//     headers: {
//       'X-RapidAPI-Key':  'KJwZZIJSFimshuivMSVGaiYzkRomp15f2vkjsnk4bkzuUzVLzA',
//       'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
//     },
//     params: { ...query },
//   };

//   const fetchData = async () => {
//     setIsLoading(true);

//     let retries = 0; // Initialize retries variable

//     const exponentialBackoff = async () => {
//       try {
//         const response = await axios.request(options);
//         setData(response.data.data);
//         setIsLoading(false);
//       } catch (error) {
//         setError(error);

//         // Check if the error is due to rate limiting (status code 429) and maximum retries reached
//         if (error.response && error.response.status === 429 && retries >= maxRetries) {
//           // console.error('Error with exponential backoff: Max retries reached');
//           setIsLoading(false);
//           throw new Error('Max retries reached');
//         }

//         // If it's a different error or still within the retry limit, continue with exponential backoff
//         const delay = Math.pow(2, retries) * initialDelay;
//         await sleep(delay);
//         retries++;
//         setIsLoading(false);

//         await exponentialBackoff(); // Retry the request
//       }
//     };

//     await exponentialBackoff(); // Start the exponential backoff process
//   };

//   const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const refetch = () => {
//     setIsLoading(true);
//     fetchData();
//   };

//   return { data, isLoading, error, refetch };
// };

// export default useFetch;