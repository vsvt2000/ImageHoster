import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

export default function CreateForm() {
    function makeRandom() {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 7; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    function encodeImage(myFile) {
        var reader = new FileReader();
        var fileByteArray = [];
        reader.readAsArrayBuffer(myFile);
        reader.onloadend = function (evt) {
            if (evt.target.readyState === FileReader.DONE) {
                var arrayBuffer = evt.target.result,
                    array = new Uint8Array(arrayBuffer);
                for (var i = 0; i < array.length; i++) {
                    fileByteArray.push(array[i]);
                }
            }
        }
        return fileByteArray;
    }

    const [image, setimage] = useState(null);

    function handleSubmit() {
        var keyGen = makeRandom();
        var encoded = encodeImage(image);
        console.log(encoded)
        const req = {
            username: "admin",
            key: keyGen,
            image: encoded
        }
        axios.post("http://localhost:5000/upload", req).then(
            res => {

                (res.status === 200) ? console.log("Upload successful!") : console.log("Error!")
            }
        )
        //console.log("Image Upload Initiated");
    }
    return (
        <div>
            <input type="file" name="image" onChange={(event) => {

                setimage(event.target.files[0])

            }} />
            {(image === null) ? null : <img src={URL.createObjectURL(image)} id="uploadimg" alt="something"></img>}
            {(image === null) ? null : <button type="submit" id="submit" onClick={handleSubmit} value="Login" class="text-white bg-blue-700 m-1 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload</button>}
        </div>
    );
}