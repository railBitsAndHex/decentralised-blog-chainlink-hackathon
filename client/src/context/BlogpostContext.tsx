import React, { useContext, useState, useEffect } from "react";
import { initialBlogpostState } from "../states/Blogpost.s";
import { IBlogpostContext, IBlogPost, BpPropsType } from "../types/blogpost.d";
import { Moralis } from "moralis";
const BlogpostContext =
  React.createContext<IBlogpostContext>(initialBlogpostState);

export const useBlogpost = () => useContext(BlogpostContext);

export const BlogpostProvider = ({ children }: BpPropsType) => {
  const createBlogpost = async (bpObj: IBlogPost) => {
    //   Insert validation
    // Validation end
    const { user, title, content } = bpObj;
    const Blogpost = Moralis.Object.extend("Blogpost");
    const bp = new Blogpost();
    bp.set("user", user);
    bp.set("title", title);
    bp.set("content", content);
    try {
      const monster = await bp.save();
      console.log(monster);
      console.log("Monster has been saved");
    } catch (error) {
      console.log("error");
    }
  };
  const value = {
    createBlogpost,
  };

  return (
    <BlogpostContext.Provider value={value}>
      {children}
    </BlogpostContext.Provider>
  );
};
