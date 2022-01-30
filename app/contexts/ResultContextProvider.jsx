import React, { createContext, useContext, useState } from "react";

//intialise createContext
const ResultContext = createContext();

//rapid api url
const baseUrl = "https://google-search3.p.rapidapi.com/api/v1";

//put child as a props in the ResultContextProvider
export const ResultContextProvider = ({ children }) => {

  //initialising state variable for results,loading and searchTerm
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  
  const getResults = async (type) => {

    //set loading status to true to wait for data to be fetched
    setIsLoading(true);

    //credentials from rapid api
    const response = await fetch(`${baseUrl}${type}`, {
      method: "GET",
      headers: {
        "x-user-agent": "desktop",
        "x-rapidapi-host": "google-search3.p.rapidapi.com",
        "x-rapidapi-key": "c0dba17876msh5845ebfce948266p161482jsn88590c64ae99",
      },
    });

    // geting the data 
    const data = await response.json();

   

    //checking if type is images or (links/videos)
    if (type.includes("/images")) {
      //setting results as imageResultsl
      setResults(data.image_results);
    } else {
      //setting results
      setResults(data.results);
    }

    //setLoading as false as the results are retrieved

    setIsLoading(false);
  };
  return (

    // pass results searchTerm and loading status over to resultContext.Provider 
    // pass the children props so that other components like navbar and routes could be rendered
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
