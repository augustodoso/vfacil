import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Docs from "./pages/Docs";
import Upload from "./pages/Upload";
import Chat from "./pages/Chat";
import Sobre from "./pages/Sobre";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/docs" element={<Docs/>} />
        <Route path="/upload" element={<Upload/>} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/sobre" element={<Sobre/>} />
      </Routes>
    </BrowserRouter>
  );
}
