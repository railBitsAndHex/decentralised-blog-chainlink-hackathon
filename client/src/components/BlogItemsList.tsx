import React, { useState, useEffect } from "react";
import { useBlogpost } from "../context/BlogpostContext";
import { useMoralisQuery } from "react-moralis";
import { useAuth } from "./../context/AuthContext";
import { useAccountsChanged } from "../hooks/AuthHooks";
import { IBlogPost } from "./../types/blogpost.d";
function BlogItemsList() {
  useAccountsChanged();
  type bpost = {
    [key: string]: any;
  };

  const [bpArr, setBpArr] = useState<Array<Object>>([]);
  const { accounts } = useAuth();
  const { retrieveBp, updateBlogpost } = useBlogpost();

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
                {bp.get("user") === accounts[0] && (
                  <span>
                    <button onClick={() => handleUpdate(bp.get("user"), bp.id)}>
                      updatePost
                    </button>
                  </span>
                )}
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default BlogItemsList;
