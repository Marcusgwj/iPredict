import axiosInstance from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { ProfileContext } from "../../context/Profile";
import AvatarPic from "./AvatarPic";

// mui
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Avatar from "@mui/material/Avatar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#111827",
    },
  },
});
const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#E4E4E7",
    },
  },
});

function ProfileSettings() {
  const { darkMode } = useContext(ThemeContext);
  const { user, loading, dispatch } = useContext(AuthContext);
  const { setUserPhoto } = useContext(ProfileContext);

  const [credentials, setCredentials] = useState({
    currentUser: user,
    newUsername: undefined,
    email: undefined,
    password: undefined,
    image: undefined,
  });

  const [message, setMsg] = useState({
    show: false,
    msg: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
    setCredentials((prev) => ({ ...prev, currentUser: user }));
  }, [user, navigate]);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("currentUser", credentials.currentUser);
      formData.append("newUsername", credentials.newUsername);
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);
      formData.append("image", credentials.image);

      const res = await axiosInstance.post("/reset/update", formData);
      if (credentials.image) {
        const response = await axiosInstance.post("/picture/getPicture", {
          username: res.data.username,
        });
        setUserPhoto(response.data);
      }
      dispatch({ type: "SUCCESS", payload: res.data.username });
      setMsg({ show: true, msg: "Updated details" });
    } catch (err) {
      setMsg({ show: true, msg: err.response.data.message });
    }
  };

  const handleClose = () => {
    setMsg({ show: false, msg: "" });
  };

  // Handling avatar photo
  const hiddenFileInput = useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const [previewSource, setPreviewSource] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setCredentials((prev) => ({ ...prev, image: file }));
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {previewSource ? (
                <Avatar
                  alt="Profile "
                  src={previewSource}
                  sx={{ width: 40, height: 40 }}
                ></Avatar>
              ) : (
                <AvatarPic />
              )}
              <>
                <Button onClick={handleClick}> Upload picture</Button>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  ref={hiddenFileInput}
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                />
              </>
            </Box>
            <Box
              noValidate
              sx={{
                mt: 1,
              }}
            >
              <TextField
                fullWidth
                id="newUsername"
                label="New username"
                placeholder={user}
                helperText="Update username"
                name="newUsername"
                autoComplete="newUsername"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="New Email Address"
                helperText="Update email address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="New Password"
                helperText="Update password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              {user === "tester" ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={true}
                >
                  Not allowed to update guest account
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  Update changes
                </Button>
              )}
            </Box>
          </form>
        </Box>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={message.show}
          message={message.msg}
          autoHideDuration={4000}
          onClose={handleClose}
        />
      </Container>
    </ThemeProvider>
  );
}

export default ProfileSettings;
