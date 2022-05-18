import  { IBlogpostContext, IBlogPost } from './../types/blogpost.d';

const defaultBlogpost : IBlogPost = {
    user: "0x0",
    title: "default title",
    content: "default content"
}
const initialBlogpostState : IBlogpostContext = {
    createBlogpost : (obj: IBlogPost) => console.log(obj),
}

export {initialBlogpostState}
