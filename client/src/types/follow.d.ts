export interface IFollowContext {
    followUser: (uid: string, fuid: string)=> void,
    unfollowUser: (uid: string, fuid: string) => void
}

export type FollowPropsType = {
    children: ReactNode
}