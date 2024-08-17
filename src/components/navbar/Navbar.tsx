import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
    <ul>
      <li>Investing</li>
      <li>Cash</li>
      <li>Planning</li>
      <li>About</li>
    </ul>
    <div className="auth-buttons">
      <button className="sign-in">Sign In</button>
      <button className="sign-up">Sign Up</button>
    </div>
  </nav>
  )
}

export default Navbar;