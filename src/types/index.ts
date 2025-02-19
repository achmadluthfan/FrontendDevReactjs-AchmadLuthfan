export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  priceRange: 1 | 2 | 3 | 4;
  categories: string[];
  photos: string[];
  isOpen: boolean;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  reviews: Review[];
}

export interface Review {
  userName: string;
  userImage: string;
  rating: number;
  text: string;
  date: string;
}

export interface User {
  username: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}
