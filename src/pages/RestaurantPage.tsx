import { useParams } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { useRestaurants } from "../context/context";
import { fromSlug } from "../utils/slug";

const RestaurantPage = () => {
  const { name } = useParams<{ name: string }>();
  const { restaurants } = useRestaurants();
  const restaurant = name
    ? restaurants.filter((restaurant) => restaurant.name === fromSlug(name))[0]
    : undefined;

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={restaurant.photos[0]}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h1 className="text-4xl font-bold text-white mb-2">
              {restaurant.name}
            </h1>
            <div className="flex items-center text-white gap-4">
              <span className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                {restaurant.rating.toFixed(1)}
              </span>
              <span className="flex items-center">
                <MapPin className="w-5 h-5 mr-1" />
                {restaurant.location.address}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div></div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            <div className="space-y-6">
              {restaurant.reviews.map((review, _) => (
                <div key={_} className="border-b pb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={review.userImage}
                      alt={review.userName}
                      className="w-12 h-12 rounded-full object-cover object-center"
                    />
                    <div>
                      <h3 className="font-semibold">{review.userName}</h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span>{review.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm ml-auto">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
