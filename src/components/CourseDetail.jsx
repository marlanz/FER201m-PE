import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../api/section";
import {
  Alert,
  Button,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    sectionName: "",
    sectionDescription: "",
    duration: "",
    isMainTask: false,
  });

  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        setCourse(response.data);
        setFormData({
          image: response.data.image,
          sectionName: response.data.sectionName,
          sectionDescription: response.data.sectionDescription,
          duration: response.data.duration,
          isMainTask: response.data.isMainTask,
        });
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourseById();
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSaveCourse = async () => {
    try {
      await axios.put(`${BASE_URL}/${id}`, formData);
      // After update, fetch updated course details
      const response = await axios.get(`${BASE_URL}/${id}`);
      setCourse(response.data);
      setEditMode(false); // Exit edit mode
      setOpenSnack(true);
      console.log("Course updated successfully.");
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  if (!course) {
    return <p>Loading...</p>; // Add a loading indicator while fetching data
  }

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
        <Alert severity="success">Updated successfully</Alert>
      </Snackbar>
      <Typography
        variant="body1"
        color="initial"
        fontSize={32}
        fontWeight={600}
      >
        Course Detail
      </Typography>
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 50,
        }}
      >
        <div className="preview-img">
          <Typography
            variant="body1"
            color="initial"
            fontSize={16}
            fontWeight={600}
          >
            Preview image course
          </Typography>
          <img
            src={formData.image}
            alt="preview"
            style={{ width: "310px", height: "330px", objectFit: "cover" }}
          />
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
            value={formData.image}
            label="Image URL"
            variant="outlined"
            onChange={(e) => handleInputChange("image", e.target.value)}
            fullWidth
            InputProps={{
              readOnly: !editMode,
            }}
          />
          <TextField
            value={formData.sectionName}
            label="Section Name"
            variant="outlined"
            onChange={(e) => handleInputChange("sectionName", e.target.value)}
            fullWidth
            InputProps={{
              readOnly: !editMode,
            }}
          />
          <TextField
            value={formData.sectionDescription}
            label="Section Description"
            variant="outlined"
            onChange={(e) =>
              handleInputChange("sectionDescription", e.target.value)
            }
            fullWidth
            InputProps={{
              readOnly: !editMode,
            }}
          />
          <TextField
            value={formData.duration}
            label="Duration"
            variant="outlined"
            onChange={(e) => handleInputChange("duration", e.target.value)}
            fullWidth
            InputProps={{
              readOnly: !editMode,
            }}
          />
          {editMode ? (
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
          ) : (
            <TextField
              value={formData.isMainTask}
              label="Is Main Task"
              variant="outlined"
              onChange={(e) => handleInputChange("isMainTask", e.target.value)}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          )}

          <Button
            variant="contained"
            sx={{ textTransform: "none", fontWeight: 600, fontSize: 16 }}
            onClick={editMode ? handleSaveCourse : () => setEditMode(true)}
          >
            {editMode ? "Save course" : "Edit course"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
