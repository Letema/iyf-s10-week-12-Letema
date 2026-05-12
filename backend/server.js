const express = require("express");
const cors = require("cors");
require("dotenv").config();

const postsRoutes = require("./routes/posts");

const authRoutes = require("./routes/auth");

const supabase = require("./services/supabase");



const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

app.use("/posts", postsRoutes);
app.get("/", async (req, res) => {
  res.send("MtaaHub API Running...");
});

app.get("/test-supabase", async (req, res) => {
  const { data, error } = await supabase
    .from("test")
    .select("*");

  if (error) {
    return res.status(500).json(error);
  }

  res.json(data);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});