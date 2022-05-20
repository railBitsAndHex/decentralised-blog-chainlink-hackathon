import { IProfileContext } from "../types/profile";
import { IUserProfile } from './../types/profile.d';

const initialProfileContext : IProfileContext = {
    createProfile: (profileObj: IUserProfile) => console.log(profileObj),    
    updateProfile: (profileObj: IUserProfile) => console.log(profileObj)    
}

export {initialProfileContext}