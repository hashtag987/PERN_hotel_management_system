import './App.css';
import Home from './components/user/Home';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ALogin from './components/admin/ALogin';
import "react-toastify/dist/ReactToastify.css";
import Book from './components/user/Book';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/alogin" element={<ALogin/>}/>
        <Route path="/book" element={<Book/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
