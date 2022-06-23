import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Charts from "./pages/Charts/Charts";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import News from "./pages/News/News";
import Sentiment from "./pages/Sentiment/Sentiment";
import Watchlist from "./pages/Watchlist/Watchlist";
import Predictions from "./pages/Predictions/Predictions";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/news" element={<News />} />
        <Route path="/sentiment" element={<Sentiment />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
