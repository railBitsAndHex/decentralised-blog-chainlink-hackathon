import React from "react";
import BlogItemsList from "../components/BlogItemsList";
import "../styles/blogpostsPage.modules.css";
function Blogfeed() {
  return (
    <>
      <section>
        <h2>Blogs</h2>
        <BlogItemsList />
      </section>
    </>
  );
}

export default Blogfeed;
