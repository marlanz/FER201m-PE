import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api/section";
import axios from "axios";
import {
  Alert,
  Avatar,
  Button,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function MyCourse() {
  const [courses, setCourses] = useState([]);
  const [openSnack, setOpenSnack] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(BASE_URL);
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleViewCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const handleDeleteCourse = async (courseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`${BASE_URL}/${courseId}`);
      // After deletion, fetch updated list of courses
      const res = await axios.get(BASE_URL);
      setCourses(res.data);
      setOpenSnack(true);
      console.log("Course deleted successfully.");
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div
      style={{ marginTop: "100px", paddingBottom: "50px", padding: "0 30px" }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnack}
        autoHideDuration={5000}
        onClose={() => setOpenSnack(false)}
      >
        <Alert severity="success">Deleted successfully</Alert>
      </Snackbar>
      <Typography
        variant="body1"
        color="initial"
        sx={{}}
        fontSize={32}
        fontWeight={600}
      >
        My Courses
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                ID
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Image
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Section Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Section Description
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Duration
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Is Main Task
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">
                  <Avatar src={row.image} />
                </TableCell>
                <TableCell align="center">{row.sectionName}</TableCell>
                <TableCell align="center">{row.sectionDescription}</TableCell>
                <TableCell align="center">{row.duration} minutes</TableCell>
                <TableCell align="center">
                  {row.isMainTask ? "Yes" : "No"}
                </TableCell>
                <TableCell align="center">
                  <div style={{ display: "flex", gap: 10 }}>
                    <Button
                      variant="contained"
                      sx={{ textTransform: "none" }}
                      onClick={() => handleViewCourse(row.id)}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ textTransform: "none", bgcolor: "red" }}
                      onClick={() => handleDeleteCourse(row.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MyCourse;
