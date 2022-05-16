import React, { useState, useEffect } from "react";
import { useMoralisQuery } from "react-moralis";
import { useBlogpost } from "../context/BlogpostContext";
function BlogItemsList() {
  const { getAllBlogpost } = useBlogpost();
  const [bpArr, setBpArr] = useState([]);
  const { fetch } = useMoralisQuery(
    "Blogpost",
    (query): any => query.select("*"),
    [],
    { autoFetch: false }
  );
  const basicQuery = async () => {
    const results = await fetch();
    console.log(results);
    // Do something with the returned Moralis.Object values
    if (results !== undefined) {
      console.log(results);
    }
  };

  return (
    <>
      <section>
        <button onClick={basicQuery}>click for feed to laod</button>
      </section>
    </>
  );
}

export default BlogItemsList;
