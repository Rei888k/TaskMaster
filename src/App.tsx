import React from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Detail from "./Detail";
import Home from "./Home";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="detail" element={<Detail />} />
            </Routes>
        </Router>
    );
}

export default App;