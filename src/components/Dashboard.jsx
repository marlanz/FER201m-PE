import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api/section";
import Typography from "@mui/material/Typography";
import { Box, Button, Card, CardMedia, Grid, IconButton } from "@mui/material";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [displayMode, setDisplayMode] = useState("grid");

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(BASE_URL, {});
      setCourses(res.data);
    };
    fetchCourse();
    console.log(courses);
  }, []);

  const handleDisplayModeChange = (mode) => {
    setDisplayMode(mode);
  };

  return (
    <div style={{ marginTop: "100px", paddingBottom: "20px" }}>
      <Grid
        container
        justifyContent={"space-between"}
        sx={{ px: "30px", mb: "20px" }}
      >
        <Grid item>
          <Typography
            variant="body1"
            color="initial"
            sx={{}}
            fontSize={32}
            fontWeight={600}
          >
            Discover many courses in different sections
          </Typography>
        </Grid>
        <Grid item sx={{ display: "flex", gap: "10px" }}>
          <IconButton onClick={() => handleDisplayModeChange("column")}>
            <ViewAgendaIcon
              sx={{ color: displayMode === "column" ? "blue" : "inherit" }}
            />
          </IconButton>
          <IconButton onClick={() => handleDisplayModeChange("grid")}>
            <ViewWeekIcon
              sx={{ color: displayMode === "grid" ? "blue" : "inherit" }}
            />
          </IconButton>
        </Grid>
      </Grid>

      {displayMode === "column" ? (
        <Box
          className=""
          sx={{ px: "30px", display: "flex", flexDirection: "column", gap: 5 }}
        >
          {courses.map((course) => (
            <Card
              key={course.id}
              elevation={0}
              sx={{
                px: "20px",
                py: "15px",
                border: "2px solid rgb(212,208,205)",
                display: "flex",
                cursor: "pointer",
                borderRadius: "15px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="" style={{ display: "flex", gap: "20px" }}>
                <CardMedia
                  component={"img"}
                  src={course.image}
                  sx={{ width: "100px", height: "100px", borderRadius: "10px" }}
                />
                <div className="" style={{}}>
                  <Typography variant="body1" fontSize={24}>
                    {course.sectionName}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="#6a6866"
                    fontSize={16}
                    sx={{ width: "1100px" }}
                  >
                    {course.sectionDescription}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    fontSize={14}
                    sx={{ mt: "10px" }}
                  >
                    Learn this course in {course.duration} minutes
                  </Typography>
                </div>
              </div>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                See course
              </Button>
            </Card>
          ))}
        </Box>
      ) : (
        <Grid
          container
          rowSpacing={8}
          sx={{ px: "30px", pb: "40px" }}
          columnSpacing={5}
        >
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card
                elevation={0}
                sx={{
                  px: "20px",
                  py: "15px",
                  border: "2px solid rgb(212,208,205)",
                  cursor: "pointer",
                  borderRadius: "15px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <CardMedia
                  component={"img"}
                  src={course.image}
                  sx={{ width: "100px", height: "100px", borderRadius: "10px" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexGrow: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body1" fontSize={24} mt={2}>
                    {course.sectionName}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="#6a6866"
                    fontSize={16}
                    sx={{ mt: 1 }}
                  >
                    {course.sectionDescription}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    fontSize={14}
                    sx={{ mt: "10px" }}
                  >
                    Learn this course in {course.duration} minutes
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: 600,
                    mt: "10px",
                    width: "100%",
                  }}
                >
                  See course
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default Dashboard;
