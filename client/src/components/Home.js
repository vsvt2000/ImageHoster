import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import image from '../images/Image_Hoster.png'

export default function Home() {
  const [img, setimg] = useState(null);
  function retrieve() {
    const req = {
      query: document.getElementById("image_id").value
    };
    console.log(req)
    axios.post("http://localhost:5000/img", req).then(
      res => {
        console.log(res.data);
      }
    );
  }
  return (
    <div class="flex items-center justify-center h-screen bg-slate-600 text-center ">
      <div>
        <input type="text" name="image_id" id="image_id" class="bg-gray-50 m-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the image ID here" required />
        <button type="submit" onClick={retrieve} class="text-white bg-blue-700 m-1 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " >Submit</button>
      </div>
    </div>
  );
}