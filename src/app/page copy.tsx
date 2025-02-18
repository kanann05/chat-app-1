"use client"; 

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import io, {Socket} from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
// import WebSocket from 'ws';

// const ws = new WebSocket('ws://www.host.com/path');
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

function Home() {
    const [username, setUsername] = useState("");
    let [dbv, setDbv] = useState(false);
    let [ibv, setIbv] = useState(false);
// const socketRef = useRef<Socket | null>(null); 
let [email, setEmail] = useState("");
    // let inviteRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        socketInitializer();
    
        return () => {
          socket.disconnect();
        };
      }, []);
      async function socketInitializer() {
        await fetch("/api/socket");
    
        socket = io();
        
        socket.on("receive-message", (data) => {
          // we get the data here
        });
      }
    

    useEffect(() => {
        const inviteElements = document.querySelectorAll('.invite-div');
    
        inviteElements.forEach((item) => {
            item.addEventListener("mousedown", (e) => {
                const mouseevent = e as MouseEvent;

                if (mouseevent.button === 0) {
                    console.log("Left click");
                    console.log((e.target as HTMLDivElement).id);
                } else if (mouseevent.button === 2) {
                    console.log("Right click");
                }
            });
        });
    
        return () => {
            inviteElements.forEach((item) => {
                item.removeEventListener("mousedown", (e) => {
                    const mouseevent = e as MouseEvent;
                    if (mouseevent.button === 0) {
                        console.log("Left click");
                        console.log((e.target as HTMLDivElement).id);
                    } else if (mouseevent.button === 2) {
                        console.log("Right click");
                    }
                });
            });
        };
    }, []);
    
    
    useEffect(()=> {
        const findUser = async () => {
            console.log(email)
            try {
                const response = await fetch('/api/findUser', {
                    method : 'POST',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify(email)
                })
                if(response.ok) {
                    let jsonRes = await response.json();
                    setUsername(jsonRes.username);
                    console.log("hello " + username)
                }
            }
            catch (error) {
                console.log("error while fetching user : " + error)
            }
        }
        findUser();
    }, [email])
    return(<div className="flex flex-col" style = {{alignItems : 'center'}}>
        {/* <h1 style = {{color : 'white'}}>wassup</h1> */}
        <div className="flex flex-row" style = {{width : '95vw', justifyContent : 'space-between', alignItems : 'center', flexDirection : 'row'}}>
            <div>
            <Button onClick = {() => {setDbv(!dbv)}} className="w-[30vw] 2xl:w-[8vw] xl:w-[7vw] lg:w-[7vw], sm:w-[15vw] sm:text-[14px]" style = {{backgroundColor : "#303030", margin : '10px 15px', width : "fit-content", fontFamily : 'gilroy-medium', letterSpacing : '0.4px'}}>Start a chat</Button>
            <div className = "w:flex-column 2xl:flex-col xl:flex-col lg:flex-col md-flex flex-col" style = {{ display : dbv? 'flex' : 'none', justifyContent : 'center', position : "absolute", alignItems : 'center', margin : "0px 15px", backgroundColor : "#222222", width: "fit-content", padding : "10px 15px", borderRadius : '7px'}}>
                <Input  value = {email} onChange = {(e) => 
                    {setEmail(e.target.value);
                        
                    }} style = {{color : "white"}} className="w-[70vw]  2xl:w-[15vw] xl:w-[20vw] lg:w-[30vw] md:w-[35vw] text-[15px] sm:w-[40vw] text-[14px]" placeholder="User's email"/>
                <div  className="w-[55vw] flex flex-row  2xl:w-[10vw] xl:w-[12vw] lg:w-[18vw] md:w-[20vw] sm:w-[24vw]"  style = {{display :  username === "" ? 'none' : 'flex', borderRadius : '5px', justifyContent : "space-around", alignItems : 'center', position : "relative", backgroundColor : "rgba(255, 223, 223, 0.7)", marginTop : '10px', padding : "7px 15px"}}><div className = "w-1/5 aspect-1/1 xl:w-1/5 lg:w-1/6 md:w-1/5 sm:w-1/5" style= {{borderRadius : '1000px', aspectRatio : '1', backgroundColor : 'rgb(255, 156, 156)', border : '1px solid black', display : 'flex', justifyContent:'center', alignItems : 'center'}}>{username.trim().charAt(0)}</div><p style = {{fontSize : '85%'}}>{username.trim().length > 10 ? (username.trim().slice(0, 10) + "..") : (username.trim())}</p></div>
            
                <Button className="w-[30vw] 2xl:w-[5vw] xl:w-[7vw] lg:w-[7vw] md:mt-2 sm:w-[10vw] mt-2" style = {{marginLeft : '10px', backgroundColor : "rgb(99, 99, 99)"}}>Text</Button>

            </div>
            </div>
            <div style = {{position : "relative"}}>
                <Button onClick = {() => {setIbv(!ibv)}} className="w-[30vw] 2xl:w-[7vw] xl:w-[7vw] lg:w-[7vw], sm:w-[15vw] sm:text-[14px]" style = {{backgroundColor : "#303030", margin : '10px 15px', fontFamily : 'gilroy-medium', letterSpacing : '0.4px'}}>Invites</Button>
                <div className = "w:flex-column 2xl:flex-col xl:flex-col lg:flex-col md-flex flex-col" style = {{ display : ibv? 'flex' : 'none', justifyContent : 'center', position : "absolute", right : 0, alignItems : 'center', margin : "0px 15px", backgroundColor : "#222222", width: "fit-content", padding : "10px 15px", borderRadius : '7px'}}>
                {/* <Input  value = {email} onChange = {(e) => 
                    {setEmail(e.target.value);
                        
                    }} style = {{color : "white"}} className="w-[70vw]  2xl:w-[15vw] xl:w-[20vw] lg:w-[30vw] md:w-[35vw] text-[15px] sm:w-[40vw] text-[14px]" placeholder="User's email"/> */}
                <div id = "kanan"  className="invite-div w-[55vw] flex flex-row  2xl:w-[10vw] xl:w-[12vw] lg:w-[18vw] md:w-[20vw] sm:w-[24vw]"  style = {{display : 'flex', borderRadius : '5px', justifyContent : "space-around", alignItems : 'center', position : "relative", backgroundColor : "rgba(255, 223, 223, 0.7)", marginTop : '10px', padding : "7px 15px"}}><div className = "w-1/5 aspect-1/1 xl:w-1/5 lg:w-1/6 md:w-1/5 sm:w-1/5" style= {{borderRadius : '1000px', aspectRatio : '1', backgroundColor : 'rgb(255, 156, 156)', border : '1px solid black', display : 'flex', justifyContent:'center', alignItems : 'center'}}>K</div><p style = {{fontSize : '85%'}}>Kanan</p></div>
                <div id = "kanada"  className="invite-div w-[55vw] flex flex-row  2xl:w-[10vw] xl:w-[12vw] lg:w-[18vw] md:w-[20vw] sm:w-[24vw]"  style = {{display : 'flex', borderRadius : '5px', justifyContent : "space-around", alignItems : 'center', position : "relative", backgroundColor : "rgba(255, 223, 223, 0.7)", marginTop : '10px', padding : "7px 15px"}}><div className = "w-1/5 aspect-1/1 xl:w-1/5 lg:w-1/6 md:w-1/5 sm:w-1/5" style= {{borderRadius : '1000px', aspectRatio : '1', backgroundColor : 'rgb(255, 156, 156)', border : '1px solid black', display : 'flex', justifyContent:'center', alignItems : 'center'}}>K</div><p style = {{fontSize : '85%'}}>Kanada</p></div>
            
                <Button className="w-[30vw] 2xl:w-[5vw] xl:w-[7vw] lg:w-[7vw] md:mt-2 sm:w-[10vw] mt-2" style = {{marginLeft : '10px', backgroundColor : "rgb(99, 99, 99)"}}>Text</Button>

            </div>
            </div>
            
        </div>
         hello

        </div>)
}
export default function App() {
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        localStorage.getItem("loggedIn") === "true" ? setLoggedIn(true) : setLoggedIn(false);
    }, []); 

    useEffect(() => {
        console.log("loggedIn state updated:", loggedIn);

        if (loggedIn === false) {
            console.log("idhar : " + loggedIn)
            router.replace("/login");
        }
        else if (loggedIn === true){
            console.log("ab : " + loggedIn);
            console.log("hello emit")
            // socket.emit("sendEmail", { "email": email2 });
            

        }
    }, [loggedIn]);

    

    if (loggedIn === null) return <h1 style={{ color: "white" }}>Loading...</h1>;

    return (<div>
        {loggedIn === true ? (<Home />) : null}
        
    </div>);
}
