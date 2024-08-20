import { Link } from "react-router-dom";
import "./Navbar.css";

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
          <Link to="/wallet-list">Go To Wallet</Link>
        </li>
        <li>
          <Link to="/">Change Network</Link>
        </li>
      </ul>
      <div className="auth-buttons">
        <Link to="/connect-wallet">
          <button className="sign-up">Connect Wallet</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
