import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';

const Upload = () => {
    const cloudinaryRef = useRef();
    // const [imgUrl,setImg]=useState(null);
    // const [idx,setIdx]=useState(null);
    const widgetRef = useRef();

    const [uploadedImageUrls, setUploadedImageUrls] = useState([]); 

    useEffect(() => {
        if (!window.cloudinary) {
            console.error("Cloudinary is not available");
            return;
        }

        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dbtrk7va2',
            uploadPreset: 'image_preset',
            multiple: true 
        }, (error, result) => {
            if (error) {
                console.error("Error while uploading image:", error);
            } else {
                console.log("Upload successful:", result);
                if (result.event === 'success' && result.info.secure_url) {
                    setUploadedImageUrls(prevUrls => [...prevUrls, result.info.secure_url]);
                    console.log("Image URL:", result.info.secure_url);
                    
                    
                }
                // uploadedImageUrls.map(setImg,setIdx);
                // console.log(imgUrl);
            }
        });
    }, []);

    const handleUploadButtonClick = () => {
        if (widgetRef.current) {
            widgetRef.current.open();
        } else {
            console.error("Upload widget is not initialized.");
        }
    };

    return (
        <div>
            <button onClick={handleUploadButtonClick}>
                Upload Images
            </button>
            
            {uploadedImageUrls.length > 0 && (
                <div>
                    <h2>Uploaded Images:</h2>
                    <div className="uploaded-images">
                        {
                        uploadedImageUrls.map((imageUrl, index) => (
                            <img key={index} src={imageUrl} alt={`Uploaded ${index + 1}`} />
                        ))
                        //console.log(uploadedImageUrls);
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default Upload;
