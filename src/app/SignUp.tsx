import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Login() {
    let router = useRouter();
    return(<div className = "login">
        <Input className="w-[70vw]  2xl:w-[15vw] xl:w-[20vw] lg:w-[30vw] md:w-[35vw] text-[15px] sm:w-[60vw] text-[14px]" style = {{color : "rgba(255, 255, 255, 0.85)"}} placeholder = "email"/>
        <Input className="w-[70vw]  2xl:w-[15vw] xl:w-[20vw] lg:w-[30vw] md:w-[35vw] text-[15px] sm:w-[60vw] text-[14px]" style = {{color : "rgba(255, 255, 255, 0.85)"}} placeholder = "username"/>
        <Input className="w-[70vw] 2xl:w-[15vw] xl:w-[20vw] lg:w-[30vw] md:w-[35vw] text-[15px] sm:w-[60vw] text-[14px]" style = {{color : "rgba(255, 255, 255, 0.85)"}} placeholder = "password"/>
        <Button className = "w-[30vw] 2xl:w-[5vw] xl:w-[7vw] lg:w-[7vw], sm:w-[10vw]" style = {{color : "rgba(255, 255, 255, 0.9)", backgroundColor : "rgba(255, 255, 255, 0.21)"}}>Sign in</Button>
        <h2 onClick = {() => {router.replace("/login")}} style = {{cursor : "pointer", color : "white", fontSize : '15px'}}>Log in</h2>
    </div>) 
}