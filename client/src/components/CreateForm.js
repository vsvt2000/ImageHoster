import React, { useState } from 'react';
import '../App.css';

export default function CreateForm() {

    const [image, setimage] = useState(null);

    function handleSubmit() {
        console.log("Image Upload Initiated");
    }
    return (
        <div>
            <input type="file" name="image" onChange={(event) => {
                
                setimage(URL.createObjectURL(event.target.files[0]))
                
                console.log("Image selected");
            }} />
            {(image===null)?null:<img src={image} alt="something"></img>}
            <button type="submit" id="submit" onClick={handleSubmit} value="Login" class="text-white bg-blue-700 m-1 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload</button>
        </div>
    );
}