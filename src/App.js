import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { getCourses } from "./api/section";
import HeaderMenu from "./components/HeaderMenu";
import Dashboard from "./components/Dashboard";
import AddCourse from "./components/AddCourse";
import CourseDetail from "./components/CourseDetail";
import MyCourse from "./components/MyCourse";

function App() {
  return (
    <>
      <HeaderMenu />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<MyCourse />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Routes>
    </>
  );
}

export default App;
