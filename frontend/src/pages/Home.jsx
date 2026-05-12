import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Step 1: Check for the token to determine login status
  const token = localStorage.getItem("mtaahub_token");

  useEffect(() => {
    // Step 2: Only fetch data if the user is logged in
    if (token) {
      fetch("http://localhost:5000/posts")
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="home-container">
      {/* HERO - Always visible */}
      <section className="hero">
        <h1>Community <span>Posts</span></h1>
        <p>Connect with your community. Share updates and ideas.</p>
      </section>

      {/* POSTS SECTION - Conditional logic */}
      <section className="posts">
        {loading ? (
          <p>Loading posts...</p>
        ) : !token ? (
          /* Case 1: NOT logged in - show restricted message */
          <div className="post-card restricted">
            <h2>Access Restricted</h2>
            <p>Please login or register to see community posts.</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px' }}>
               <Link to="/login"><button className="post-btn">Login</button></Link>
               <Link to="/register"><button className="post-btn" style={{ background: '#333' }}>Register</button></Link>
            </div>
          </div>
        ) : posts.length > 0 ? (
          /* Case 2: Logged in & has posts */
          posts.map((post) => (
            <div className="post-card" key={post.id} style={{ textAlign: 'left' }}>
              <h2>{post.title}</h2>
              <p>{post.description}</p> 
            </div>
          ))
        ) : (
          /* Case 3: Logged in but no posts yet */
          <div className="post-card">
            <h2>No posts found</h2>
            <p>Be the first to share something!</p>
            <Link to="/create"><button className="post-btn">Create Post</button></Link>
          </div>
        )}
      </section>

      <footer>© 2024 MtaaHub. All rights reserved.</footer>
    </div>
  );
}

export default Home;
