import React, { useState, useEffect } from "react";
import { useBlogpost } from "../context/BlogpostContext";
import { useMoralisQuery } from "react-moralis";
import { useAuth } from "./../context/AuthContext";
import { useAccountsChanged } from "../hooks/AuthHooks";
import { IBlogPost } from "./../types/blogpost.d";
import { Link } from "react-router-dom";
function BlogItemsList() {
  useAccountsChanged();
  type bpost = {
    [key: string]: any;
  };

  const [bpArr, setBpArr] = useState<Array<Object>>([]);
  const { accounts } = useAuth();
  const { retrieveBp, updateBlogpost, deleteBlogpost } = useBlogpost();

  const handleUpdate = (uid: string, bpid: string) => {
    console.log(`uid: ${uid}, bpid: ${bpid}`);
    if (uid !== accounts[0]) return;
    const updateObj: IBlogPost = {
      user: accounts[0],
      title: `Newly updated title for ${bpid}`,
      content: `Newly updated content for ${bpid} `,
    };
    updateBlogpost(uid, updateObj, bpid);
  };
  const handleDelete = (uid: string, bpid: string) => {
    console.log(`uid: ${uid}, bpid: ${bpid}`);
    if (uid !== accounts[0]) return;
    deleteBlogpost(uid, bpid);
  };

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
    console.log(`Accounts ${accounts[0]}`);
  }, [fetch, accounts, retrieveBp]);
  return (
    <>
      <section>
        <div>
          {bpArr &&
            bpArr.map((bp: bpost) => (
              <div
                key={bp.id}
                style={{
                  border: "1px solid black",
                  margin: "10px 0px 10px 0px",
                  paddingBottom: "10px",
                }}
              >
                <div>Title: {bp.get("title")}</div>
                <div>Content: {bp.get("content")}</div>
                <div>Writer: {bp.get("user")}</div>
                <Link to={"/profile-page/" + bp.get("user")}>Writer</Link>
                {bp.get("user") === accounts[0] && (
                  <div>
                    <span>
                      <button
                        onClick={() => handleUpdate(bp.get("user"), bp.id)}
                      >
                        updatePost
                      </button>
                    </span>
                    <span>
                      <button
                        onClick={() => handleDelete(bp.get("user"), bp.id)}
                      >
                        delete post
                      </button>
                    </span>
                  </div>
                )}
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default BlogItemsList;
