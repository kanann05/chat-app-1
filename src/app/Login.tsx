"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {useEffect, useState} from 'react'

export default function Login() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    
    let router = useRouter();
    useEffect(() => {
        if(localStorage.getItem("loggedIn") === "true") {
            router.replace("/")
        }
        localStorage.setItem("accessToken", "");
       
    }, [])

    return(<div className = "login">
        {localStorage.getItem("loggedIn") === "true" ? (null) : (
            <><Input value = {email} onChange = {(e) => {setEmail(e.target.value)}} className="w-[70vw]  2xl:w-[15vw] xl:w-[20vw] lg:w-[30vw] md:w-[35vw] text-[15px] sm:w-[60vw] text-[14px]" style={{ color: "rgba(255, 255, 255, 0.85)", fontFamily : 'gilroy-medium'}} placeholder="email" /><Input value = {password} onChange = {(e) => {setPassword(e.target.value)}} className="w-[70vw] 2xl:w-[15vw] xl:w-[20vw] lg:w-[30vw] md:w-[35vw] text-[15px] sm:w-[60vw] text-[14px]" style={{ color: "rgba(255, 255, 255, 0.85)", fontFamily : 'gilroy-medium' }} placeholder="password" /><Button onClick = {() => {
                
                    const login = async () => {
                        try {
                        const response = await fetch('/api/checkAccess', {
                            method : 'POST',
                            headers : {
                                'Content-Type': 'application/json'
                            },
                            body : JSON.stringify({email, password})
                        }
                       )
                       if(!response.ok) {
                            console.log("uh oh, error while loggin in")
                        }
                        else {
                            // console.log(response)
                            let res = await response.json();
                        
                            if(res.access !== "denied") {
                                
                                let accessToken = res.access;
                                console.log("hello ::: " + accessToken)
                                const token = async () => {
                                    try {
                                        const response2 = await fetch('/api/checkTok', {
                                            method : 'POST',
                                            headers : {
                                                'Content-type' : 'applcication/json'
                                            },
                                            body : JSON.stringify(accessToken)
                                        })
                                        if(response2.ok) {
                                            
                                            let out = await response2.json();
                                            if(out.token === "valid") {
                                                localStorage.setItem("accessToken", accessToken);
                                                localStorage.setItem("email", email);

                                                router.replace("/");
                                                localStorage.setItem("loggedIn", "true");
                                            }
                                            else {
                                                localStorage.setItem("accessToken", "");

                                            }
                                        }
                                    }
                                    catch(error) {console.log(error)}
                                }
                                token();
                            }
                            else {
                                console.log("error while checking token")
                            }
                        }
                    }
                    catch(error) {console.log(error)}
                    }
                    login();
                    
                
                
            }}className="w-[30vw] 2xl:w-[5vw] xl:w-[7vw] lg:w-[7vw], sm:w-[10vw]" style={{ color: "rgba(255, 255, 255, 0.9)",fontFamily : 'gilroy-medium', backgroundColor: "rgba(255, 255, 255, 0.21)" }}>Log in</Button><h2 onClick={() => { router.replace("/signup"); } } style={{ cursor: "pointer", color: "white", fontSize: '15px', fontFamily : 'gilroy-medium' }}>Sign up</h2></>
        )}
        
    </div>) 
}