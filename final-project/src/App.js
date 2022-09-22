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
import { UserContextProvider } from "./context/userContext";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Router>
          <nav>
            <Link to="/register">Register</Link>
          </nav>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
