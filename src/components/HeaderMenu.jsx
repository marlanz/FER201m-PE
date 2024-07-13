import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";

function HeaderMenu() {
  return (
    <div>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <div
            className=""
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <SchoolIcon color="white" />
            <Typography variant="h6" fontWeight={500}>
              Coursera - Learning platform
            </Typography>
          </div>

          <Typography
            variant="body1"
            color="white"
            fontSize={20}
            sx={{ ml: "100px", textDecoration: "none" }}
            component={Link}
            to={"/dashboard"}
          >
            Dashboard
          </Typography>

          <Typography
            variant="body1"
            color="white"
            fontSize={20}
            sx={{ ml: "50px", textDecoration: "none" }}
            component={Link}
            to={"/courses"}
          >
            My Courses
          </Typography>
          <Typography
            variant="body1"
            color="white"
            fontSize={20}
            sx={{ ml: "50px", textDecoration: "none" }}
            component={Link}
            to={"/add-course"}
          >
            Add Course
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeaderMenu;
