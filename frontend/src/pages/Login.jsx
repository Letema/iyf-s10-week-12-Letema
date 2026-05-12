import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Save token for session persistence
        localStorage.setItem("mtaahub_token", result.session.access_token);
        alert("logged in successfully!");
        navigate("/");
      } else {
        alert(result.error);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Login</h1>
        <form className="form" onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} 
            onChange={(e) => setEmail(e.target.value)} required />
          
          <input type="password" placeholder="Password" value={password} 
            onChange={(e) => setPassword(e.target.value)} required />
          
          <button type="submit">Login</button>
        </form>
        <p style={{ marginTop: "10px" }}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
