import {
  AppBar,
  Toolbar,
  CssBaseline,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
import SignUp from "./SignUp";
import { auth } from "../db/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import CircularProgress from "@mui/material/CircularProgress";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [user, loading] = useAuthState(auth);
  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Link
          to="/"
          style={{
            flexGrow: 1,
            cursor: "pointer",
            fontSize: 30,
            color: "white",
            textDecoration: "none",
          }}
        >
          Navbar
        </Link>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <Box
            sx={{
              marginLeft: 10,
              display: "flex",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: 20,
                marginLeft: 20,
                marginTop: 3,
              }}
            >
              Home
            </Link>
            <Link
              to="/about"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: 20,
                marginLeft: 20,
                marginTop: 3,
              }}
            >
              About
            </Link>
            <Link
              to="/contact"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: 20,
                marginLeft: 20,
                marginTop: 3,
              }}
            >
              Contact
            </Link>
            {loading ? (
              <CircularProgress
                style={{
                  color: "white",
                  width: 35,
                }}
              />
            ) : user ? (
              <div>
                <Link to="/dashboard">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL ? user.photoURL : ""}
                      alt={user.email ? user.email.charAt(0) : "User"}
                      referrerPolicy="no-referrer"
                      style={{
                        width: 35,
                        borderRadius: 30,
                        marginLeft: 10,
                      }}
                    />
                  ) : (
                    <AccountCircleIcon
                      style={{
                        color: "white",
                        marginLeft: 10,
                        fontSize: 35,
                      }}
                    />
                  )}
                </Link>
              </div>
            ) : (
              <SignUp />
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
