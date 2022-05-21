export interface IUserProfile {
    uid: string, 
    username?: string,
    bio?: string|undefined
    following?: number,
    followers?: number
}

export interface IProfileContext {
    createProfile: (profileObj: IUserProfile) => void,
    updateProfile: (profileObj: IUserProfile) => void
}

export type ProfilePropsType = {
    children: ReactNode
}