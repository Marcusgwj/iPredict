import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Charts from "./pages/Charts/Charts";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Reset from "./pages/Reset/Reset";
import PasswordReset from "./pages/Reset/PasswordReset";
import News from "./pages/News/News";
import Sentiment from "./pages/Sentiment/Sentiment";
import Watchlist from "./pages/Watchlist/Watchlist";
import Predictions from "./pages/Predictions/Predictions";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/passwordReset/:token/:id" element={<PasswordReset />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/news" element={<News />} />
        <Route path="/sentiment" element={<Sentiment />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
