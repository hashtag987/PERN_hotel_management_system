import "./App.css";
import Home from "./components/user/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ALogin from "./components/admin/ALogin";
import "react-toastify/dist/ReactToastify.css";
import Book from "./components/user/Book";
import Admin from "./components/admin/Admin";
import Reservation from "./components/admin/components/Reservation";
function App() {
  const DOMAIN = "http://localhost:5000";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home DOMAIN={DOMAIN} />} />
        <Route path="/alogin" element={<ALogin DOMAIN={DOMAIN} />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/book" element={<Book DOMAIN={DOMAIN} />} />
        <Route path="/reservation" element={<Reservation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
