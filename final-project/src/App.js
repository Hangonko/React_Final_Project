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

function App() {
  return (
    <div className="App">
      <Router>
        <UserContextProvider>
          <MainLayout>
            <nav>
              <Link to="/">Home</Link>
              <br />
              <Link to="./login">Login</Link>
              <br />
              <Link to="/register">Register</Link>
            </nav>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile:name" element={<Profile />} />
            </Routes>
          </MainLayout>
        </UserContextProvider>
      </Router>
    </div>
  );
}

export default App;
