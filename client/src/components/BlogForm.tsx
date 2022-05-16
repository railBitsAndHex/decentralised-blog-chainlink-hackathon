import React, { useRef } from "react";
import { IBlogPost } from "./../types/blogpost.d";
import { useBlogpost } from "./../context/BlogpostContext";
import { useAuth } from "./../context/AuthContext";
function BlogForm() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const { createBlogpost } = useBlogpost();
  const { accounts } = useAuth();

  const handleSubmit = (e: React.FormEvent): void => {
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
