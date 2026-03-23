import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route
          path="/ZC/zoneCertificateValidInvalid/appNo=ZC-0000-MU-2026-0-04520"
          element={<Home />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
