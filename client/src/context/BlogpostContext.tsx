import React, { useContext, useState } from "react";
import { initialBlogpostState } from "../states/Blogpost.s";
import { IBlogpostContext, IBlogPost, BpPropsType } from "../types/blogpost.d";

const BlogpostContext =
  React.createContext<IBlogpostContext>(initialBlogpostState);

export const useBlogpost = useContext(BlogpostContext);

export const BlogpostProvider = ({ children }: BpPropsType) => {
  const createBlogpost = (bpObj: IBlogPost) => {
    console.log("###This is bp context ");
    console.table(bpObj);
    console.log("##### end bp context");
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
