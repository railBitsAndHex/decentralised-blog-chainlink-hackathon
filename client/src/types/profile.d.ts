export interface IUserProfile {
    uid: string, 
    username: string,
    bio: string
}

export interface IProfileContext {
    createProfile: (profileObj: IUserProfile) => void
}

export type ProfilePropsType = {
    children: ReactNode
}