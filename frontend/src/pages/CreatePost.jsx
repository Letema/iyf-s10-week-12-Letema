import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        alert("Post Published!");
        navigate("/");
      } else {
        const err = await response.json();
        alert("Error: " + err.error);
      }
    } catch (err) {
      console.error("Connection error:", err);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Create Post</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea placeholder="Write your post..." rows="6" value={content} onChange={(e) => setContent(e.target.value)} required />
          <button type="submit">Publish</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
