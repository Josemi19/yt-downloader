import React, { useState } from 'react';
import Alert from '../components/Alert';
import ProgressBar from '../components/ProgressBar';

const Landing = () => {
    const [videoUrl, setVideoUrl] = useState("")
    const [inputError, setInputError] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [downloadedVideos, setDownloadedVideos] = useState([])

    const sendUrl = async (url) => {
        try{
            // Throw an error if the input is empty
            if(url.trim() === "") throw new Error("You have to provide an url, It can't be empty")
            // Throw an error if the url provided is not from youtube
            if(
                !(url.includes("https://www.youtube.com/watch")) 
                && 
                !(url.includes("https://youtu.be/"))
            )throw new Error("The url must be a Youtube video")
            setShowAlert(false)
            const response = await fetch("http://127.0.0.1:3000/download-video", {
                method: "POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify(url) 
            })
            const data = await response.json()
            setDownloadedVideos([...downloadedVideos, data])
        }catch(error){
            console.error(error)
            setInputError(error)
            setShowAlert(true)
        }
    }

    return (
        <div className='container h-75'>
            <div>
                <input 
                type="text" 
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)} />
                <button 
                type='button' 
                className='btn btn-danger'
                onClick={() => sendUrl(videoUrl)}
                >Download Video</button>
                {/* <ProgressBar/> */}
            </div>
            {showAlert && <Alert error={inputError}/>}
            <div>
                {downloadedVideos.map((video) => {
                    return(
                        <p>{video}</p>
                    )
                })}
            </div>
        </div>
    );
};

export default Landing;