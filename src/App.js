import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// ===========================authentication===========================
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";

// ===========================home===========================
import Home from "./pages/Home";

// ===========================skills===========================
import SkillList from "./pages/skills/SkillList";

// ===========================experience===========================
import AddExperience from "./pages/experiences/AddExperience";
import ExperienceList from "./pages/experiences/ExperienceList";
import EditExperience from "./pages/experiences/EditExperience";

// ===========================contacts===========================
import ContactList from "./pages/contacts/ContactList";

// ===========================project===========================
import AddProject from "./pages/projects/AddProject";
import EditProject from "./pages/projects/EditProject";
import ProjectList from "./pages/projects/ProjectList";

// ===========================users===========================
import EmailVerificationPage from "./pages/Users/EmailVerificationPage";
import SendResetPasswordRequest from "./pages/Users/SendResetPasswordRequest";
import PasswordResetForm from "./pages/Users/PasswordResetForm";
function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {/* ===========================authentication=========================== */}
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />

                    {/* ===========================home/main menu=========================== */}
                    <Route exact path="/home" element={<Home />} />

                    {/* ===========================skills=========================== */}
                    <Route exact path="/skills" element={<SkillList />} />

                    {/* ===========================exerience=========================== */}
                    <Route
                        exact
                        path="/experience"
                        element={<ExperienceList />}
                    />
                    <Route
                        exact
                        path="/experience/add"
                        element={<AddExperience />}
                    />
                    <Route
                        exact
                        path="/experience/:experienceId"
                        element={<EditExperience />}
                    />

                    {/* ===========================contacts=========================== */}
                    <Route exact path="/contacts" element={<ContactList />} />

                    {/* ===========================projects=========================== */}
                    <Route exact path="/projects" element={<ProjectList />} />
                    <Route
                        exact
                        path="/projects/add"
                        element={<AddProject />}
                    />
                    <Route
                        exact
                        path="/projects/:projectId"
                        element={<EditProject />}
                    />

                    {/* ===========================users=========================== */}
                    <Route
                        exact
                        path="/verify/:userId/:token"
                        element={<EmailVerificationPage />}
                    />
                    <Route
                        exact
                        path="/forgotpass"
                        element={<SendResetPasswordRequest />}
                    />
                    <Route
                        exact
                        path="/resetpass/:userId/:token"
                        element={<PasswordResetForm />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
