import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// ===========================authentication===========================
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import Home from "./pages/Home";
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
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
