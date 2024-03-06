import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function Citiesprovider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});


  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("Error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, [])

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("Error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  return <CitiesContext.Provider value={{
    cities,
    isLoading,
    currentCity,
    getCity,
  }}>
    {children}
  </CitiesContext.Provider>
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("context")
  return context;
}

export { Citiesprovider, useCities };