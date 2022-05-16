import React, { useRef } from "react";
import { IBlogPost } from "./../types/blogpost.d";
import { useBlogpost } from "./../context/BlogpostContext";
import { useAuth } from "./../context/AuthContext";
import { useNavigate } from "react-router-dom";
function BlogForm() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const { createBlogpost } = useBlogpost();
  const { accounts } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const titleVal: string | undefined = titleRef.current?.value;
    const contentVal: string | undefined = contentRef.current?.value;
    if (!(titleVal && contentVal)) return;
    const blogPost: IBlogPost = {
      user: accounts[0],
      title: titleVal,
      content: contentVal,
    };
    createBlogpost(blogPost);
    navigate("/blogfeed");
    console.log(blogPost);
  };
  return (
    <>
      <form>
        <label>Title</label>
        <input ref={titleRef} type="text" />
        <label>Write Post</label>
        <textarea ref={contentRef}></textarea>
        <button type="submit" onClick={handleSubmit}>
          Create Post
        </button>
      </form>
    </>
  );
}

export default BlogForm;
