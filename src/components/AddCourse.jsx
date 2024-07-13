import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Snackbar,
  TextField,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../api/section";

function AddCourse() {
  const [course, setCourse] = useState({
    id: "",
    image: "",
    sectionName: "",
    sectionDescription: "",
    duration: "",
    isMainTask: false,
  });

  const [openSnack, setOpenSnack] = useState(false);

  const [error, setError] = useState({
    duration: false,
  });

  const handleInputChange = (key, event) => {
    const value = event;
    if (key === "duration") {
      const durationError = /[^\d]/.test(value);
      setError({ ...error, duration: durationError });
    }
    setCourse({ ...course, [key]: value });
  };

  const handleAddCourse = async () => {
    let i = 0;
    let uniqueIdFound = false;

    try {
      while (!uniqueIdFound) {
        try {
          // Attempt to fetch the course with the current ID
          await axios.get(`${BASE_URL}/${i}`);
          // If the course exists, increment i and continue
          i++;
        } catch (err) {
          if (err.response && err.response.status === 404) {
            // If a 404 error occurs, it means the course with this ID does not exist
            uniqueIdFound = true;
            setCourse({ ...course, id: i.toString() });
          } else {
            // If some other error occurs, log it and break the loop
            console.error("There was an error checking the course ID!", err);
            return;
          }
        }
      }

      // Once a unique ID is found, proceed to add the course
      const response = await axios.post(BASE_URL, {
        ...course,
        id: i.toString(),
      });
      console.log("Course added:", response.data);

      // Reset the form after submission
      setCourse({
        id: "",
        image: "",
        sectionName: "",
        sectionDescription: "",
        duration: "",
        isMainTask: false,
      });
      setError({
        duration: false,
      });
    } catch (err) {
      console.error("There was an error adding the course!", err);
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
        <Alert severity="success">Course added successfully</Alert>
      </Snackbar>
      <Typography
        variant="body1"
        color="initial"
        fontSize={32}
        fontWeight={600}
      >
        Add Course
      </Typography>
      <div
        className=""
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 50,
        }}
      >
        <div className="preview-img" style={{}}>
          <Typography
            variant="body1"
            color="initial"
            fontSize={16}
            fontWeight={600}
          >
            Preview image course
          </Typography>
          {course.image ? (
            <img
              src={course.image}
              alt="preview"
              style={{ width: "310px", height: "330px", objectFit: "cover" }}
            />
          ) : (
            <Skeleton variant="rounded" width={310} height={260} />
          )}
        </div>
        <div
          className="form"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 30,
          }}
        >
          <TextField
            value={course.image}
            label="Image URL"
            variant="outlined"
            onChange={(e) => handleInputChange("image", e.target.value)}
            fullWidth
          />
          <TextField
            value={course.sectionName}
            label="Section Name"
            variant="outlined"
            onChange={(e) => handleInputChange("sectionName", e.target.value)}
            fullWidth
          />
          <TextField
            value={course.sectionDescription}
            label="Section Description"
            variant="outlined"
            onChange={(e) =>
              handleInputChange("sectionDescription", e.target.value)
            }
            fullWidth
          />
          <TextField
            value={course.duration}
            label="Duration"
            variant="outlined"
            onChange={(e) => handleInputChange("duration", e.target.value)}
            fullWidth
            error={error.duration}
            helperText={error.duration ? "Please enter only numbers" : ""}
          />
          <TextField
            value={course.isMainTask}
            label="Is Main Task"
            variant="outlined"
            onChange={(e) => handleInputChange("isMainTask", e.target.value)}
            fullWidth
            select
          >
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </TextField>
          <Button
            variant="contained"
            sx={{ textTransform: "none", fontWeight: 600, fontSize: 16 }}
            disabled={
              course.image.trim() === "" ||
              course.duration.trim() === "" ||
              course.sectionName.trim() === "" ||
              course.sectionDescription.trim() === "" ||
              error.duration
            }
            onClick={() => {
              handleAddCourse();
              setOpenSnack(true);
            }}
          >
            Save course
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
