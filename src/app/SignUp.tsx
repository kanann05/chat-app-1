"use client";
import {useState, useEffect} from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Login() {
    let [email, setEmail] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let router = useRouter();

    useEffect(() => {
        if(localStorage.getItem("loggedIn") === "true") {
            router.replace("/")
        }
    }, [])
    return(<div className = "login">
        {localStorage.getItem("loggedIn") === "true" ? (null) : (<>
            <Input value = {email} onChange = {(e) => setEmail(e.target.value)} className="w-[70vw]  2xl:w-[15vw] xl:w-[20vw] lg:w-[30vw] md:w-[35vw] text-[15px] sm:w-[60vw] text-[14px]" style = {{color : "rgba(255, 255, 255, 0.85)", fontFamily : 'gilroy-medium'}} placeholder = "email"/>
        <Input value = {username} onChange = {(e) => setUsername(e.target.value)} className="w-[70vw]  2xl:w-[15vw] xl:w-[20vw] lg:w-[30vw] md:w-[35vw] text-[15px] sm:w-[60vw] text-[14px]" style = {{color : "rgba(255, 255, 255, 0.85)", fontFamily : 'gilroy-medium'}} placeholder = "username"/>
        <Input value = {password} onChange = {(e) => setPassword(e.target.value)} className="w-[70vw] 2xl:w-[15vw] xl:w-[20vw] lg:w-[30vw] md:w-[35vw] text-[15px] sm:w-[60vw] text-[14px]" style = {{color : "rgba(255, 255, 255, 0.85)", fontFamily : 'gilroy-medium'}} placeholder = "password"/>
        <Button onClick = { async (e) => {
            e.preventDefault();
            try {
                const response = await fetch('/api/signup', {
                    method : 'POST',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify({email, username, password})
                })
                if (!response.ok) {
                    console.log("uhoh, error")
                  }
                  else {
                    let res = await response.json();
                    if(res.success === false) {
                        console.log("error while creating your id")
                    }
                    else {
                        localStorage.setItem("accessToken", res.token)
                        localStorage.setItem("loggedIn", "true");
                        localStorage.setItem("email", email);

                        router.replace("/");
                    }
                  }
            }
            catch (error) {
                console.log("error occured while signing up : " + error)
            }
        }}className = "w-[30vw] 2xl:w-[5vw] xl:w-[7vw] lg:w-[7vw], sm:w-[10vw]" style = {{color : "rgba(255, 255, 255, 0.9)", backgroundColor : "rgba(255, 255, 255, 0.21)", fontFamily : 'gilroy-medium'}}>Sign in</Button>
        <h2 onClick = {() => {router.replace("/login")}} style = {{cursor : "pointer", color : "white", fontSize : '15px', fontFamily : 'gilroy-medium'}}>Log in</h2>
        </>)}
        
    </div>) 
}