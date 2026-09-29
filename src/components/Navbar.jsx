import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">SITHA</Link>

      <div>
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/products">Products</Link>
        <Link to="/become-partner">Become a Partner</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;