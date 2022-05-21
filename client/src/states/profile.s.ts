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
    }
    return defaultProfileObj;
}
export {initialProfileContext, createDefaultAccount}