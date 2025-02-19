import { useEffect, useState } from "react";
import { useRestaurants } from "../context/context";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import RestaurantCard from "../components/RestaurantCard";
import FilterBar from "../components/FilterBar";

const HomePage = () => {
  const { restaurants, filteredRestaurants, setFilteredRestaurants } =
    useRestaurants();
  const [isOpenOnly, setIsOpenOnly] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  const { isAuthenticated, user, logout } = useAuth();

  // filter
  useEffect(() => {
    let filtered = [...restaurants];

    if (isOpenOnly) {
      filtered = filtered.filter((restaurant) => restaurant.isOpen);
    }

    if (selectedPrice) {
      filtered = filtered.filter(
        (restaurant) => restaurant.priceRange === selectedPrice
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((restaurants) =>
        restaurants.categories.includes(selectedCategory)
      );
    }

    setFilteredRestaurants(filtered);
  }, [isOpenOnly, selectedPrice, selectedCategory]);

  const uniqueCategories = Array.from(
    new Set(restaurants.flatMap((r) => r.categories))
  );

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between">
        <div>
          <h1 className="text-4xl font-normal mb-2">Restaurants</h1>
          <p className="text-gray-600 mb-8">
            Discover the best restaurants in your area
          </p>
        </div>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Hi, {user?.username}</span>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <User className="w-5 h-5 mr-1" />
              Sign in
            </Link>
          )}
        </div>
      </div>

      <FilterBar
        onOpenNowChange={setIsOpenOnly}
        onPriceChange={setSelectedPrice}
        onCategoryChange={setSelectedCategory}
        categories={uniqueCategories}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRestaurants.slice(0, visibleCount).map((restaurant, index) => (
          <RestaurantCard key={index} restaurant={restaurant} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleCount < filteredRestaurants.length && (
          <button
            onClick={handleLoadMore}
            className="border-[1px] py-2 col-span-4 mt-8 rounded-md w-fit mx-auto px-20 border-slate-800"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
