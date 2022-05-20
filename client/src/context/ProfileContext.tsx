import React, { useContext } from "react";

const ProfileContext = React.createContext<IProfileContxt>(initalProfileState);
export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }: ProfilePropsType) => {
  const value = {};
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
