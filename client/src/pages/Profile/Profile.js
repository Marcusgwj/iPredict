import ProfileSettings from "../../components/Profile/ProfileSettings";
import Navbar from "../../components/Navbar/Navbar";
import ThemeIcon from "../../components/Header/ThemeIcon";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <ThemeIcon />
      <ProfileSettings />
    </div>
  );
};

export default Profile;
