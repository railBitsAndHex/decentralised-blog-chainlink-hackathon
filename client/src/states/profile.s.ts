import { IProfileContext } from "../types/profile";
import { IUserProfile } from './../types/profile.d';

const initialProfileContext : IProfileContext = {
    createProfile: (profileObj: IUserProfile) => console.log(profileObj),    
    updateProfile: (profileObj: IUserProfile) => console.log(profileObj)    
}
const createDefaultAccount = (acc: string) : IUserProfile => {
    const defaultProfileObj : IUserProfile = {
        uid: acc,
        username: "",
        bio: "",
        following:0,
        followers:0

    }
    return defaultProfileObj;
}
export {initialProfileContext, createDefaultAccount}