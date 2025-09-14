import { useState } from "react"
import { InputBox } from "../components/InputBox";
import {Button} from '../components/Button'
import {Heading} from '../components/Heading'
import {SubHeading} from  '../components/Subheading'
import axios from "axios"
import {useNavigate} from "react-router-dom"

export function Signup() {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] =  useState("");
    const [username, setusername] = useState("");
    const [password, setpasword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-black h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
            <InputBox onChange={e => {
                setfirstname(e.target.value);
            }}
            placeholder="harsh" label={"firstname"}/>
            <InputBox onChange={e => {
                setlastname(e.target.value);
            }} placeholder="arora" label={"lastname"}/>
            <InputBox onChange={e => {
                setusername(e.target.value);
            }} placeholder="harsh23" label={"username"}/>
            <InputBox onChange={e => {
                setpasword(e.target.value);
            }} placeholder="password" label={"password"}/>

            <div className="pt-4">
                <Button onClick={ async() => {
                    try {
                   await axios.post("http://localhost:3000/api/v1/user/signup", {
                    username,
                    password,
                    firstname,
                    lastname
                   });
                   navigate('/')
                } catch (error) {
                    console.error(error.message + "signup failed");
                    alert("signup failed")
                }
                }} label={"Signup"}/>

            </div>
            
        </div>
        </div>
        </div>
    )
}