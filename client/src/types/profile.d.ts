export interface IUserProfile {
    uid: string, 
    username?: string,
    bio?: string|undefined
    following?: number,
    followers?: number
}

export interface IProfileContext {
    retrieveP: boolean,
    setRetrieveP: (retrieveP: boolean) => void,
    createProfile: (profileObj: IUserProfile) => void,
    updateProfile: (profileObj: IUserProfile) => void
}

export type ProfilePropsType = {
    children: ReactNode
}