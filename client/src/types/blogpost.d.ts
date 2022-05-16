export interface IBlogPost {
    title: string ,
    content: string
}

export interface IBlogpostContext {
    createBlogpost : (obj: IBlogPost) => void
}

export type BpPropsType = {
    children: ReactNode
}