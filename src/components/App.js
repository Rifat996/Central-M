import React from "react";
import Signup from "./Signup";
import { Container } from 'react-bootstrap'
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import AdministratorLogin from "./AdministratorLogin";
import AdministratorDashboard from "./AdministratorDashboard"

function App() {

return (
    
       <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}> 
        <div className="w-100" style={{ maxWidth: "400px" }}>
            <Router>
            <AuthProvider>
                <Routes>
                <Route path="/" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute> }></Route>
                  <Route path="/update-profile" element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute> }></Route>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
                <Route path="/administratorlogin" element={<AdministratorLogin/>} />
                <Route path="/administratordashboard" element={<AdministratorDashboard/>} />
                </Routes>
            </AuthProvider>
            </Router>
        </div>
        </Container>
    

    )
}

export default App;