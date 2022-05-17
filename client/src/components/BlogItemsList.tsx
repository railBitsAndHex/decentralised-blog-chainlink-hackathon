import React, { useState, useEffect } from "react";
import { useBlogpost } from "../context/BlogpostContext";
import { useMoralisQuery } from "react-moralis";

function BlogItemsList() {
  type bpost = {
    [key: string]: any;
  };
  const [bpArr, setBpArr] = useState<Array<Object>>([]);
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
  }, [fetch]);
  return (
    <>
      <section>
        <div>
          {bpArr && bpArr.map((bp: bpost) => <div>{bp.get("title")}</div>)}
        </div>
        <button>Click me to view blogpost!</button>
      </section>
    </>
  );
}

export default BlogItemsList;
