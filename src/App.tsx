import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { RestaurantsProvider } from "./context/context";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RestaurantPage from "./pages/RestaurantPage";

function App() {
  return (
    <AuthProvider>
      <RestaurantsProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Routes>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route
                        path="/restaurant/:name"
                        element={<RestaurantPage />}
                      />
                    </Routes>
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
          </div>
        </Router>
      </RestaurantsProvider>
    </AuthProvider>
  );
}

export default App;
