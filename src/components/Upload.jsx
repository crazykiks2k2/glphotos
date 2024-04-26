import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'

const Upload = () => {

  const [img, setImg] = useState(null);
  const [presetName, setPresetName] = useState('images_preset');
  //const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const uploadFile = async () => {
    // Assuming 'file' is the File object you want to convert
const file = img; // Your File object

// Create a new instance of FileReader
const reader = new FileReader();
const buffer = "";

// Define a function to handle the 'load' event when FileReader has finished reading the file
reader.onload = () => {
  // 'result' property of FileReader contains the file data as a base64-encoded string
   buffer = reader.result;

  // Now you can use the 'buffer' variable which contains the file data as a byte array buffer
  console.log(buffer);
};

// Read the file as a binary string
reader.readAsArrayBuffer(file);
    const data={
        file: buffer,
        upload_preset:presetName,

    }
    console.log(data);

    try {
      //let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      let resourceType = 'image';
      let api = `https://api.cloudinary.com/v1_1/dbtrk7va2/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(img)
    try {
      setLoading(true);

      // Upload image file
      const imgUrl = await uploadFile();

      // Upload video file
      //const videoUrl = await uploadFile('video');

      // Send backend api request
      //await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/videos`, { imgUrl, videoUrl });

      // Reset states 
      setImg(null);
    //   setVideo(null);

      console.log("File upload success!");
      setLoading(false);
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="video">Video:</label>
          <br />
          <input
            type="file"
            accept="video/*"
            id="video"
            onChange={(e) => setVideo((prev) => e.target.files[0])}
          />
        </div>
        <br /> */}
        <div>
          <label htmlFor="img">Image:</label>
          <br />
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={(e) => setImg( e.target.files[0])}
          />
        </div>
        <br />
        <button type="submit">Upload</button>
      </form>

      {
        loading && <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      }
    </div>


  )
}

export default Upload