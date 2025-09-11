import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";

const NavBar = () => {
  const user = useSelector(getUser);

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="mt-4 mb-4 rounded"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          AdSpot
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            {user ? (
              <>
                <Nav.Link as={NavLink} to="/ad/add">
                  Add
                </Nav.Link>
                <Nav.Link as={NavLink} to="/logout">
                  Sign out
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Sign in
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Sign up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
