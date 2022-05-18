import  { IBlogpostContext, IBlogPost } from './../types/blogpost.d';

const defaultBlogpost : IBlogPost = {
    user: "0x0",
    title: "default title",
    content: "default content"
}
const initialBlogpostState : IBlogpostContext = {
    retrieveBp: false,
    setRetrieveBp: (val:boolean) => console.log(val),
    createBlogpost : (obj: IBlogPost) => console.log(obj),
    updateBlogpost:(uid:string, bpObj: IBlogPost, bpid: string) => console.log("update bp")
}

export {initialBlogpostState}
