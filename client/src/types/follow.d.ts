export interface IFollowContext {
    retrieveFollow: boolean,
    setRetrieveFollow: (retrievFollow: boolean) => void,
    followUser: (uid: string, fuid: string)=> void,
    unfollowUser: (uid: string, fuid: string) => void
}

export type FollowPropsType = {
    children: ReactNode
}