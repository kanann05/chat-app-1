"use client"; // Required for client-side rendering

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login"; // Ensure correct import
// import SignUp from "../pages/ui/SignUp";



export default function App() {
    let [loggedIn, setLoggedIn] = useState(true);
    let router = useRouter();
    useEffect(() => {
        if(!loggedIn) {
            router.replace("/login")
        }
        if(loggedIn) {
            router.replace("/")
        }
    }, [])

    return (
        <h1>hello</h1>
    );
}
