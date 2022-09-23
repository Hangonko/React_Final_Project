import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import { UserContextProvider } from "./context/userContext";
import MainLayout from "./components/layout";
import LoginPage from "./pages/LoginPage";
import ProductFormPage from "./pages/ProductFormPage";
import ProtectedRoute from "./app/ProtectedRoute";
import { isUserAdmin } from "./app/util";
import { ProductContextProvider } from "./context/productContext";

function App() {
  const isAdmin = isUserAdmin();
  return (
    <div className="App">
      <Router>
        <UserContextProvider>
          <ProductContextProvider>
            <MainLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile/:name" element={<Profile />} />
                <Route
                  path="/products/new"
                  element={
                    <ProtectedRoute hasAccess={isAdmin}>
                      <ProductFormPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </MainLayout>
          </ProductContextProvider>
        </UserContextProvider>
      </Router>
    </div>
  );
}

export default App;
