import { useState } from "react";
import Login from './Login.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Router() {
    return (
        <BrowserRoute>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </BrowserRoute>
    )
}

export default Router