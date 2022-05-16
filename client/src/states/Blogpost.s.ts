import  { IBlogpostContext, IBlogPost } from './../types/blogpost.d';

const initialBlogpostState : IBlogpostContext = {
    createBlogpost : (obj: IBlogPost) => console.log(obj)
}

export {initialBlogpostState}
