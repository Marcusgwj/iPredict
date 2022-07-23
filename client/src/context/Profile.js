import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axiosInstance from "../utils/config";

export const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(() => {
    const retrievePhoto = async () => {
      if (user) {
        try {
          const res = await axiosInstance.post("/api/picture/getPicture", {
            username: user,
          });
          setUserPhoto(res.data);
        } catch (error) {
          setUserPhoto(null);
        }
      }
    };
    retrievePhoto();
  }, [user]);

  return (
    <ProfileContext.Provider value={{ userPhoto, setUserPhoto }}>
      {children}
    </ProfileContext.Provider>
  );
};
