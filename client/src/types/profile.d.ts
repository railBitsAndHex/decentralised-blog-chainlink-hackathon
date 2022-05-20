export interface IUserProfile {
    username: string,
    bio: string
}

export interface IProfileContext {
    createProfile: (profileObj: IUserProfile) => void
}

export type ProfilePropsType = {
    children: ReactNode
}