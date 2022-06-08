import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
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
  const logout = () => {
    navigate("/");
    dispatch({ type: "LOGOUT" });
  };
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <nav className="nav">
        <h1 className="heading">iPredict</h1>

        <div className={show ? "navmenu show" : "navmenu"}>
          <Link to="/" className="navlink">
            <div className="icon">
              <HomeIcon /> Home
            </div>
          </Link>
          <Link to="/charts" className="navlink">
            <div className="icon">
              <CandlestickChartIcon />
              Charts
            </div>
          </Link>
          <Link to="/news" className="navlink">
            <div className="icon">
              <ArticleIcon />
              News
            </div>
          </Link>
          <Link to="/sentiment" className="navlink">
            <div className="icon">
              <InsertEmoticonIcon />
              Sentiment
            </div>
          </Link>
          <Link to="/predictions" className="navlink">
            <div className="icon">
              <SearchIcon />
              Predictions
            </div>
          </Link>
          <Link to="/portfolio" className="navlink">
            <div className="icon">
              <AddToQueueIcon />
              Portfolio
            </div>
          </Link>
        </div>
        <div className="navbtn">
          {user ? (
            <>
              <button disabled className="user">
                {user}
              </button>
              <button className="navbtnlink" onClick={() => logout()}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="navbtnlink">
                Sign In
              </Link>
              <Link to="/signup" className="navbtnlink">
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
