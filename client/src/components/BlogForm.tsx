import React, { useRef } from "react";
import { IBlogPost } from "./../types/blogpost.d";
import { useBlogpost } from "./../context/BlogpostContext";
import { useAuth } from "./../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAccountsChanged } from "../hooks/AuthHooks";

import { Form, Button } from "react-bootstrap";

import "../styles/blogCreate.modules.css";
function BlogForm() {
  useAccountsChanged();
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
  };

  return (
    <>
      <section className="blog-create-sect">
        <Form className="blog-create-form">
          <Form.Group>
            <Form.Label className="blog-content-title">Title</Form.Label>
            <Form.Control
              placeholder="Enter title here"
              className="blog-create-title"
              required
              name="title"
              ref={titleRef}
              type="text"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="blog-content-label">Write Post</Form.Label>
            <Form.Control
              className="blog-create-content"
              placeholder="Write blog content here"
              as="textarea"
              required
              type="textarea"
              ref={contentRef}
            />
          </Form.Group>
          <Button size="lg" type="submit" variant="dark" onClick={handleSubmit}>
            Create Post
          </Button>
        </Form>
      </section>
    </>
  );
}

export default BlogForm;
