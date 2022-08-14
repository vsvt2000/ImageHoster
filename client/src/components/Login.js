import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

export default function Login() {
    const [buttonText, setbuttonText] = useState("Login");

    function nameChange() {
        const element = document.getElementById("name");
        console.log(element.value);
        if (element.value.length > 0) {
            setbuttonText("Register");
        }
        else {
            setbuttonText("Login");
        }
    }

    function handleSubmit() {
        if (buttonText === "Register") {
            const req={
                name:document.getElementById("name").value,
                username:document.getElementById("username").value,
                password:document.getElementById("password").value
            }
            axios.post("http://localhost:5000/register",req).then(res => {
                console.log(res);
            })
        }
        else {

        }
    }

    return (
        <div class="flex items-center justify-center h-screen bg-slate-600 text-center">
            <div>
                <input type="text" name="namefield" id="name" onChange={nameChange} class="bg-gray-50 m-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name (enter if you want to sign in)" required />
                <input type="text" name="usernamefield" id="username" class="bg-gray-50 m-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required />
                <input type="password" name="passwordfield" id="password" class="bg-gray-50 m-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
                <button type="submit" id="submit" onClick={handleSubmit} value="Login" class="text-white bg-blue-700 m-1 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{buttonText}</button>
            </div>
        </div>
    );
}