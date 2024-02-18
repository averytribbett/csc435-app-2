import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import AccountIcon from './icons8-account-96.png';
import CartIcon from './icons8-cart-96.png';
import { Link } from 'react-router-dom';

export const NavBar = ({ onSearch }) => {
  // Pass the search string value to Home parent component
  const handleSearch = (e) => onSearch(e.currentTarget[0].value);
  
  return (
    <Navbar className="bg-body-tertiary justify-content-between px-4">
      <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Navbar.Brand>CSP Store</Navbar.Brand>
      </Link>
      <Container className="justify-content-end px-0">
        {onSearch && // Only display search on Home page
          <Form inline onChange={handleSearch}>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
            </Col>
          </Form>
        }
        <Link to="/account">
          <img
            alt="Account Button"
            src={AccountIcon}
            width="30"
            height="30"
            className="d-inline-block align-top mx-4"
          />
        </Link>
        <Link to="/cart">
          <img
            alt="Cart Button"
            src={CartIcon}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        </Link>
      </Container>
    </Navbar>
  );
}