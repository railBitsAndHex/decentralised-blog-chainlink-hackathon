import  { IBlogpostContext, IBlogPost } from './../types/blogpost.d';

const initialBlogpostState : IBlogpostContext = {
    createBlogpost : (obj: IBlogPost) => console.log("Creating blogpost")
}

export {initialBlogpostState}
