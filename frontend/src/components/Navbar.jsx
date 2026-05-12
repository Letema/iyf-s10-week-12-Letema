import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  
  // Check if the user has a token
  const isLoggedIn = !!localStorage.getItem("mtaahub_token");

  const handleLogout = () => {
    // 1. Remove the token from storage
    localStorage.removeItem("mtaahub_token");
    
    // 2. Alert the user
    alert("Logged out successfully");
    
    // 3. Send them to the login page
    navigate("/login");
    
    // 4. Force a refresh to update the Navbar state immediately
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">MtaaHub</Link>
      
      <div className="nav-links">
        <Link to="/">Home</Link>
        
        {isLoggedIn ? (
          /* SHOW ONLY IF LOGGED IN */
          <>
            <Link to="/create">Create Post</Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          /* SHOW ONLY IF GUEST */
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
