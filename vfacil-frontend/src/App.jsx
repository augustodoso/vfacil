import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/Upload";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<UploadPage />} />
      </Routes>
    </BrowserRouter>
  );
}
