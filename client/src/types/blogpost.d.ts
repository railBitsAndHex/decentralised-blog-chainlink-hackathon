export interface IBlogPost {
    user: string,
    title: string ,
    content: string
}

export interface IBlogpostContext {
    createBlogpost : (obj: IBlogPost) => void,
    getAllBlogpost: () => void
}

export type BpPropsType = {
    children: ReactNode
}