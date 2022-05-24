import React, { useState, useEffect } from "react";
import { useBlogpost } from "../context/BlogpostContext";
import { useMoralisQuery } from "react-moralis";
import { useAuth } from "./../context/AuthContext";
import { useAccountsChanged } from "../hooks/AuthHooks";
import { IBlogPost } from "./../types/blogpost.d";
import { Link } from "react-router-dom";
import BlogItem from "./BlogItem";
function BlogItemsList() {
  useAccountsChanged();
  type bpost = {
    [key: string]: any;
  };

  const [bpArr, setBpArr] = useState<Array<Object>>([]);
  const { accounts } = useAuth();
  const { retrieveBp, updateBlogpost, deleteBlogpost } = useBlogpost();

  // reading
  const { fetch } = useMoralisQuery(
    "Blogpost",
    (query) => query.select("user", "title", "content"),
    [],
    { autoFetch: true }
  );
  useEffect(() => {
    fetch({
      onSuccess: (blogpost) => {
        setBpArr(blogpost);
      },
    });
  }, [fetch, accounts, retrieveBp]);
  return (
    <>
      <section className="blog-item-list-sect">
        <div className="blog-item-list-col">
          {bpArr &&
            bpArr.map((bp: bpost) => (
              <div key={bp.id}>
                <BlogItem blogpost={bp} />
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default BlogItemsList;
