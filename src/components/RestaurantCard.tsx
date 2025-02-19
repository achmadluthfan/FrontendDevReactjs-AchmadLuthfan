import React from "react";
import { Link } from "react-router-dom";
import { Star, DollarSign } from "lucide-react";
import { Restaurant } from "../types";
import { toSlug } from "../utils/slug";

interface Props {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<Props> = ({ restaurant }) => {
  const { name, rating, priceRange, categories, photos, isOpen } = restaurant;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={photos[0]} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{name}</h3>
          <span className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            {rating.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">{categories[0]}</span>
          <span className="flex">
            {Array.from({ length: priceRange }).map((_, index) => (
              <DollarSign key={index} className="w-4 h-4 text-green-600" />
            ))}
          </span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {isOpen ? "Open Now" : "Closed"}
          </span>
        </div>
        <Link
          to={`/restaurant/${toSlug(name)}`}
          className="block w-full text-center bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
