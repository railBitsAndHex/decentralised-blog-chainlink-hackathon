import React, { useState } from "react";
import { Link } from "react-router-dom";
import { dateParser } from "../helper/blogsPostedCreate";
import { accShorten } from "./../helper/helpFn";
import "../styles/blogItem.modules.css";
import { useAuth } from "./../context/AuthContext";
import { IBlogPost } from "./../types/blogpost.d";
import { useBlogpost } from "./../context/BlogpostContext";

import { Button } from "react-bootstrap";
type blogPost = {
  [key: string]: any;
};
interface IProps {
  blogpost: blogPost;
}

function BlogItem(props: IProps) {
  const { accounts } = useAuth();
  const { retrieveBp, updateBlogpost, deleteBlogpost } = useBlogpost();
  const [viewMore, setViewMore] = useState<boolean>(false);
  const bp: blogPost = props.blogpost;
  const dateStr = dateParser(bp);
  const userShortened = accShorten(bp.get("user"));
  const bpContent = bp.get("content");
  const handleUpdate = (uid: string, bpid: string) => {
    if (uid !== accounts[0]) return;
    const updateObj: IBlogPost = {
      user: accounts[0],
      title: `Newly updated title for ${bpid}`,
      content: `Newly updated content for ${bpid} `,
    };
    updateBlogpost(uid, updateObj, bpid);
  };
  const handleDelete = (uid: string, bpid: string) => {
    if (uid !== accounts[0]) return;
    deleteBlogpost(uid, bpid);
  };

  return (
    <>
      <section className="blog-item-sect">
        <div className="item-post-title">{bp.get("title")}</div>
        <section className="user-info-sect">
          <div className="user-info-div">
            <div>
              Author:{" "}
              <Link to={"/profile-page/" + bp.get("user")}>
                {userShortened}
              </Link>
            </div>
            <div>Date: {dateStr}</div>
          </div>
          <div className="update-delete-div">
            {bp.get("user") === accounts[0] && (
              <div>
                <span>
                  <Button
                    variant="info"
                    onClick={() => handleUpdate(bp.get("user"), bp.id)}
                  >
                    updatePost
                  </Button>
                </span>
                {"   "}
                <span>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(bp.get("user"), bp.id)}
                  >
                    delete post
                  </Button>
                </span>
              </div>
            )}
          </div>
        </section>
        <section className="blog-item-content-sect">
          <div className="blog-item-content">
            {bpContent.length > 400 ? (
              <div>
                {bpContent.substring(0, 400)}{" "}
                {!viewMore && (
                  <span
                    className="view-more"
                    onClick={() => setViewMore(!viewMore)}
                  >
                    View Full Post
                  </span>
                )}
                {viewMore && bpContent.substring(400, bpContent.length)}{" "}
                {viewMore && (
                  <span
                    className="view-less"
                    onClick={() => setViewMore(!viewMore)}
                  >
                    See less
                  </span>
                )}
              </div>
            ) : (
              <span>{bpContent}</span>
            )}
          </div>
        </section>
      </section>
    </>
  );
}

export default BlogItem;
