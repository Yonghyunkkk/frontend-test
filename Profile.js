import React, { useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import axios from 'axios'
const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}
const Profile = () => {
  let [picture, setPicture] = useState('')
  const webcamRef = React.useRef(null)
  const capture = React.useCallback(() => {
    console.log('Photo Taken!') 
    const pictureSrc = webcamRef.current.getScreenshot()
    setPicture(pictureSrc)
  })

  useEffect(() => {
    console.log(picture)
    axios.post('http://localhost:8000/server',{name:picture}).then(res => console.log(res))
  }, [picture]);
  return (
    <div>
      <h2 className="mb-5 text-center">
        React Photo Capture using Webcam Example
      </h2>
      <div>
        {picture == '' ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={picture} />
        )}
      </div>
      <div>
        {picture != '' ? (
          <button
            onClick={(e) => {
              e.preventDefault()
            
              setPicture()
              console.log(picture)
        
              axios.get('http://localhost:8000/check')
              .then(res => console.log(res))
            }}
            className="btn btn-primary"
          >
            Retake
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault()
              capture()
            }}
            className="btn btn-danger"
          >
            Capture
          </button>
        )}
      </div>
    </div>
  )
}
export default Profile
