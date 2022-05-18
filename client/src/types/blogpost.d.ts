export interface IBlogPost {
    user: string,
    title: string ,
    content: string
}

export interface IBlogpostContext {
    retrieveBp:boolean,
    setRetrieveBp: (val: boolean) =>void,
    createBlogpost : (obj: IBlogPost) => void,
    updateBlogpost: (uid:string, bpObj:IBlogpost, bpid:string) => void
}

export type BpPropsType = {
    children: ReactNode
}