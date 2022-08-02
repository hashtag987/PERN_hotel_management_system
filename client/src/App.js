import "./App.css";
import Home from "./components/user/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ALogin from "./components/admin/ALogin";
import "react-toastify/dist/ReactToastify.css";
import Book from "./components/user/Book";
import Admin from "./components/admin/Admin";
function App() {
  // const DOMAIN = "http://localhost:5000";
  const DOMAIN = "https://arun-froyo-grande.herokuapp.com";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home DOMAIN={DOMAIN} />} />
        <Route path="/alogin" element={<ALogin DOMAIN={DOMAIN} />} />
        <Route path="/admin/*" element={<Admin DOMAIN={DOMAIN} />} />
        <Route path="/book" element={<Book DOMAIN={DOMAIN} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
