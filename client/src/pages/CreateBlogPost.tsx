import React from "react";
import BlogForm from "../components/BlogForm";
import { BlogpostProvider } from "../context/BlogpostContext";
function CreateBlogPost() {
  return (
    <>
      <BlogpostProvider>
        <BlogForm />
      </BlogpostProvider>
    </>
  );
}

export default CreateBlogPost;
