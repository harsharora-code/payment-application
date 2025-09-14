import { useState } from "react"
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/Subheading";
import axios from "axios";

export function Signin() {
    const [username, setusername] = useState("");
    const [password, setpasword] = useState("");
    const navigate =  useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Signin"}/>
                    <SubHeading label={"enter ur credientilas to accesss ur  account" }/>
             <InputBox onChange={(e)  =>  {
                setusername(e.target.value);
             }}
             placeholder={"Enter ur username"}
             label={"username"}
             />
             <InputBox onChange={(e) => {
                setpasword(e.target.value);
             }}
             placeholder={"Enter ur password"}
             label={"password"}
             />
             <div className="pt-4">  
                <Button onClick={  async() => {
                    try {

                    
                 const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                    username,
                    password
                  });
                  localStorage.setItem("token", response.data.token);
                  navigate("/")
                } catch (error) {
                    console.error("error", error.message)
                    alert("Signin failed")
                }
                }}
                label={"Signin"}
            
                 />

             </div>
        </div>
        </div>
        </div>
    )
}