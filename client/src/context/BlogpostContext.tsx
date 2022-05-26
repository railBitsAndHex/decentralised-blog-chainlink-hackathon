import React, { useContext, useState, useEffect } from "react";
import { initialBlogpostState } from "../states/Blogpost.s";
import { IBlogpostContext, IBlogPost, BpPropsType } from "../types/blogpost.d";
import { Moralis } from "moralis";
const BlogpostContext =
  React.createContext<IBlogpostContext>(initialBlogpostState);

export const useBlogpost = () => useContext(BlogpostContext);

export const BlogpostProvider = ({ children }: BpPropsType) => {
  const [retrieveBp, setRetrieveBp] = useState(false);
  const createBlogpost = async (bpObj: IBlogPost) => {
    const { user, title, content } = bpObj;
    const Blogpost = Moralis.Object.extend("Blogpost");
    const bp = new Blogpost();
    bp.set("user", user);
    bp.set("title", title);
    bp.set("content", content);
    try {
      await bp.save();
      setRetrieveBp(!retrieveBp);
    } catch (error) {
      console.log("error");
    }
  };
  const updateBlogpost = async (
    uid: string,
    bpObj: IBlogPost,
    bpid: string
  ) => {
    const Blogpost = Moralis.Object.extend("Blogpost");
    const query = new Moralis.Query(Blogpost);
    query.equalTo("user", uid);
    query.equalTo("objectId", bpid);
    try {
      const result = await query.first();
      if (result !== undefined) {
        try {
          result.set("title", bpObj.title);
          result.set("content", bpObj.content);
          result.save();
          setRetrieveBp(!retrieveBp);
          console.log("Successful update");
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.log("Oops somethign went wrong with update");
            console.log(err.message);
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) console.log(err.message);
    }
  };
  const deleteBlogpost = async (uid: string, bpid: string) => {
    const Blogpost = Moralis.Object.extend("Blogpost");
    const query = new Moralis.Query(Blogpost);
    query.equalTo("user", uid);
    query.equalTo("objectId", bpid);
    try {
      const result = await query.first();
      if (result !== undefined) {
        try {
          const dObj = await result.destroy();
          console.log(dObj);
          setRetrieveBp(!retrieveBp);
          console.log("Successful update");
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.log("Oops somethign went wrong with update");
            console.log(err.message);
          }
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) console.log(error.message);
    }
  };
  const value = {
    createBlogpost,
    updateBlogpost,
    retrieveBp,
    setRetrieveBp,
    deleteBlogpost,
  };

  return (
    <BlogpostContext.Provider value={value}>
      {children}
    </BlogpostContext.Provider>
  );
};
