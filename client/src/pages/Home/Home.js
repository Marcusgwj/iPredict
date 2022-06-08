import Navigation from "../../components/Navbar/Navbar";
import "./Home.css";
import { FormControl, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [ticker, setTicker] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/stocks/${ticker}`);
  };

  return (
    <div className="home">
      <Navigation></Navigation>
      <div className="homeContainer">
        <h1 className="homeText">iPredict</h1>
        <Form className="d-flex" onSubmit={handleSubmit}>
          <FormControl
            type="search"
            placeholder="Search stock ticker"
            className="me-2"
            aria-label="Search"
            onChange={(e) => setTicker(e.target.value)}
          />
          <Button type="submit" variant="outline-light">
            Search{" "}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Home;
