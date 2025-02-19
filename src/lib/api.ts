import { Restaurant } from "../types";

export const getRestaurants = async (
  category?: string
): Promise<Restaurant[]> => {
  try {
    const response = await fetch(
      "https://my-json-server.typicode.com/achmadluthfan/api-restaurant/restaurant"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch restaurants");
    }

    const data = await response.json();

    if (category) {
      return data.filter(
        (r: Restaurant) => r && r.categories && r.categories.includes(category)
      );
    }

    return data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
};
