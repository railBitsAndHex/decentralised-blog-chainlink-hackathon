import React from "react";

function BlogForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <form>
        <label>Title</label>
        <input type="text" />
        <label>Write Post</label>
        <textarea></textarea>
        <button type="submit">Create Post</button>
      </form>
    </>
  );
}

export default BlogForm;
