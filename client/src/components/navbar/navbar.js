import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Container,
  Button,
} from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

function Navigation() {
  const { user, dispatch } = useContext(AuthContext);
  const logout = () => {
    navigate("/");
    dispatch({ type: "LOGOUT" });
  };

  const [ticker, setTicker] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/stocks/${ticker}`);
  };

  return (
    <Navbar className="bar" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand>iPredict</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/stocks">Stocks</Nav.Link>
            <Nav.Link href="/predictions">Predictions</Nav.Link>
            <Nav.Link href="/news">News</Nav.Link>
            <Nav.Link href="/sentiment">Sentiment</Nav.Link>

            <NavDropdown title="Portfolio" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/stocks">Action</NavDropdown.Item>
              <NavDropdown.Item href="/stocks">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/stocks">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
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
          {user ? (
            <div>
              <Button
                variant="outline-success"
                style={{ marginLeft: "10px" }}
                disabled
              >
                {user}
              </Button>
              <Button
                type="submit"
                onClick={logout}
                variant="outline-light"
                style={{ marginLeft: "5px" }}
              >
                Sign out
              </Button>
            </div>
          ) : (
            <div>
              <Button
                href="/signin"
                variant="outline-light"
                style={{ marginLeft: "10px" }}
              >
                Sign in
              </Button>
              <Button
                href="/signup"
                variant="outline-light"
                style={{ marginLeft: "10px" }}
              >
                Sign up
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
