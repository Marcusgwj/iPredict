import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ProfileContext } from "../../context/Profile";
import Avatar from "@mui/material/Avatar";

export default function AvatarPic() {
  const { user } = useContext(AuthContext);
  const { userPhoto } = useContext(ProfileContext);
  return (
    <>
      {userPhoto ? (
        <Avatar
          alt="Profile "
          src={userPhoto}
          sx={{ width: 40, height: 40 }}
        ></Avatar>
      ) : (
        <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
          {user[0]}
        </Avatar>
      )}
    </>
  );
}
