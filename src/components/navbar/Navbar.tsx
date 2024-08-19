import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create-wallet">Create Wallet</Link>
        </li>
        <li>
          <Link to="/">Planning</Link>
        </li>
        <li>
          <Link to="/">About</Link>
        </li>
      </ul>
      <div className="auth-buttons">
        <button className="sign-in">Sign In</button>
        <button className="sign-up">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;