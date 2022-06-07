import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Help from "@mui/icons-material/Help";

export default function Popup({ content }) {
  const { darkMode } = useContext(ThemeContext);

  return (
    <PopupState variant="popper">
      {(popupState) => (
        <div>
          <Button
            variant="text"
            size="small"
            style={{
              maxWidth: "30px",
              maxHeight: "30px",
              minWidth: "30px",
              minHeight: "30px",
            }}
            {...bindToggle(popupState)}
          >
            <Help size="small"> </Help>
          </Button>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper
                  style={{
                    background: `${darkMode ? "#24262e" : "#e3e3e8"}`,
                  }}
                >
                  <Typography
                    variant="subtitle3"
                    sx={{
                      p: 2,
                      color: `${darkMode ? "#d9d9db" : "black"}`,
                    }}
                    display="block"
                    gutterBottom
                  >
                    {content}
                  </Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}
