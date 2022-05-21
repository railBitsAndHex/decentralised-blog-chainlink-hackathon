import { IFollowContext } from './../types/follow.d';
const InitialFollowContext: IFollowContext  = {
    followUser: (uid: string, fuid: string) => console.log(`${uid} follows ${fuid}`),
    unfollowUser: (uid: string, fuid: string) => console.log(`${uid} unfollows ${fuid}`)
}

export {InitialFollowContext}