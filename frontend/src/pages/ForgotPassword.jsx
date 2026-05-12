import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      alert(data.message || data.error);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Reset Password</h1>
        <form className="form" onSubmit={handleReset}>
          <input type="email" placeholder="Enter email" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
