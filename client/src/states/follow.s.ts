import { IFollowContext } from './../types/follow.d';
const InitialFollowContext: IFollowContext  = {
    retrieveFollow: false,
    setRetrieveFollow: (retrievFollow: boolean) => console.log(retrievFollow),
    followUser: (uid: string, fuid: string) => console.log(`${uid} follows ${fuid}`),
    unfollowUser: (uid: string, fuid: string) => console.log(`${uid} unfollows ${fuid}`)
}

export {InitialFollowContext}