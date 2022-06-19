import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/config";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import ArticleIcon from "@mui/icons-material/Article";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SearchIcon from "@mui/icons-material/Search";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (err) {
      dispatch({ type: "FAILURE", payload: err.response.data });
    }
  };
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <nav className="nav">
        <p className="heading">iPredict</p>

        <div className={show ? "menu show" : "menu"}>
          <Link to="/" className="navlink">
            <div className="page">
              <HomeIcon className="icon" />
              Home
            </div>
          </Link>
          <Link to="/charts" className="navlink">
            <div className="page">
              <CandlestickChartIcon className="icon" />
              Charts
            </div>
          </Link>
          <Link to="/news" className="navlink">
            <div className="page">
              <ArticleIcon className="icon" />
              News
            </div>
          </Link>
          <Link to="/sentiment" className="navlink">
            <div className="page">
              <InsertEmoticonIcon className="icon" />
              Sentiment
            </div>
          </Link>
          <Link to="/predictions" className="navlink">
            <div className="page">
              <SearchIcon className="icon" />
              Predictions
            </div>
          </Link>
          <Link to="/watchlist" className="navlink">
            <div className="page">
              <AddToQueueIcon className="mr-2" />
              Watchlist
            </div>
          </Link>
        </div>
        <div className="navbtn">
          {user ? (
            <>
              <button disabled className="user">
                {user}
              </button>
              <button className="btnlink" onClick={() => logout()}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="btnlink">
                Sign In
              </Link>
              <Link to="/signup" className="btnlink">
                Sign Up
              </Link>
            </>
          )}
        </div>
        <div className="bars" onClick={handleClick}>
          {show ? <FaTimes /> : <FaBars />}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
