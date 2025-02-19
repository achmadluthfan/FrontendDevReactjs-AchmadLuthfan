import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getRestaurants } from "../lib/api";
import { Restaurant } from "../types";

interface RestaurantsContextProps {
  restaurants: Restaurant[];
  filteredRestaurants: Restaurant[];
  setFilteredRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>;
}

const RestaurantsContext = createContext<RestaurantsContextProps | undefined>(
  undefined
);

export const RestaurantsProvider = ({ children }: { children: ReactNode }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
        setFilteredRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <RestaurantsContext.Provider
      value={{ restaurants, filteredRestaurants, setFilteredRestaurants }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};

export const useRestaurants = () => {
  const context = useContext(RestaurantsContext);
  if (!context) {
    throw new Error("useRestaurants must be used within a RestaurantsProvider");
  }
  return context;
};
