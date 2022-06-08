import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import Charts from "./pages/Charts/Charts";
import Stock from "./pages/Stock/Stock";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import News from "./pages/News/News";
import Sentiment from "./pages/Sentiment/Sentiment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/stocks/:id" element={<Stock />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/news" element={<News />} />
        <Route path="/sentiment" element={<Sentiment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
