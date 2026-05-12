const express = require("express");
const router = express.Router();
const supabase = require("../services/supabase");

// GET all posts
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Fetch Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// POST a new post
router.post("/", async (req, res) => {
  const { title, content } = req.body; 

  const { data, error } = await supabase
    .from("posts")
    .insert([
      { 
        title: title, 
        description: content // Using your 'description' column
      }
    ])
    .select();

  if (error) {
    console.error("Supabase Insert Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
  res.status(201).json(data);
});


module.exports = router;
