const express = require("express");
const router = express.Router();
const supabase = require("../services/supabase");

// REGISTER ROUTE
router.post("/register", async (req, res) => {
  const { email, password, fullName, phoneNumber } = req.body;

  // 1. Sign up in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) return res.status(400).json({ error: authError.message });

  // 2. Insert into public.users table
  if (authData.user) {
    const { error: dbError } = await supabase
      .from("users")
      .insert([
        {
          id: authData.user.id,
          full_name: fullName,
          phone_number: phoneNumber,
          email: email,
        },
      ]);

    if (dbError) return res.status(400).json({ error: dbError.message });
  }

  res.status(201).json({ message: "Registration successful!" });
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(401).json({ error: error.message });

  res.status(200).json({
    message: "Login successful",
    session: data.session,
    user: data.user,
  });
});

// FORGOT PASSWORD ROUTE
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/reset-password",
  });

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: "Reset link sent to your email!" });
});

module.exports = router;
