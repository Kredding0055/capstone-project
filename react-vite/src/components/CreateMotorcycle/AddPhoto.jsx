// import { useState, useEffect } from 'react';
// import { s3Client, PutObjectCommand } from '../../../aws';
// import { addMotorcyleImageThunk } from '../../redux/motorcycleImages';
// import { useDispatch } from 'react-redux';

// const AddPhoto = ({ triggerUpload }) => {
//   const dispatch = useDispatch();
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
//   const [error, setError] = useState(null);

//   const handleFileChange = (event) => {
//     console.log('Selected files:', event.target.files);
//     setSelectedFiles((prevFiles) => [...prevFiles, ...event.target.files]);
//   };

//   const handleDeleteFile = (index) => {
//     setSelectedFiles((prevFiles) => prevFiles.filter((file, i) => i !== index));
//   };

//   const handleImageUpload = async () => {
//     console.log('Uploading files:', selectedFiles);
    
//     const uploadPromises = selectedFiles.map((file) => {
//       console.log('Upload params:', uploadParams);
//       const uploadParams = {
//         Bucket: 'weride-capstone-project',
//         Key: file.name,
//         Body: file,
//       };

//       const command = new PutObjectCommand(uploadParams);
//       return s3Client.send(command).then((data) => {
//         return `https://${process.env.AWS_BUCKET_NAME}.s3.us-east-2.amazonaws.com/${file.name}`;
//       });
//     });

//     try {
//       const urls = await Promise.all(uploadPromises);
//       setUploadedImageUrls(urls);
//       dispatch(addMotorcyleImageThunk(urls));
//     } catch (err) {
//       // console.error(err);
//       console.error('Error uploading image:', err);
//       setError('Failed to upload image. Please try again.');
//     }
//   };


//   useEffect(() => {
//     if (triggerUpload) {
//       handleImageUpload();
//     }
//   }, [triggerUpload]);

//   return (
//     <div>
//       {selectedFiles.map((file, index) => (
//         <div key={index} style={{ display: 'flex'}}>
//           <p>Photo {index + 1}: {file.name}</p>
//           <button className="delete-photo-button" onClick={() => handleDeleteFile(index)}>
//             Delete
//           </button>
//           {uploadedImageUrls[index] && (
//             <p style={{ marginLeft: '10px' }}>Uploaded Image URL: {uploadedImageUrls[index]}</p>
//           )}
//         </div>
//       ))}
//       <input type="file" multiple onChange={handleFileChange} />
//       {error && <p className="error">{error}</p>}
//     </div>
//   );
// };

// export default AddPhoto;
import { useState, useEffect } from 'react';
import { s3Client, PutObjectCommand } from '../../../aws';
import { addMotorcyleImageThunk } from '../../redux/motorcycleImages';
import { useDispatch } from 'react-redux';

const AddPhoto = ({ triggerUpload }) => {
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    console.log('Selected files:', event.target.files);
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleDeleteFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((file, i) => i !== index));
  };

  const handleImageUpload = async () => {
    if (selectedFiles.length === 0) {
      console.error('No files selected for upload');
      return;
    }

    console.log('Uploading files:', selectedFiles);

    const uploadPromises = selectedFiles.map((file) => {
      console.log('Uploading file:', file);
      const uploadParams = {
        Bucket: 'weride-capstone-project',
        Key: file.name,
        Body: file,
      };
      console.log('Upload params:', uploadParams);

      const command = new PutObjectCommand(uploadParams);
      return s3Client.send(command).then((data) => {
        return `https://${process.env.AWS_BUCKET_NAME}.s3.us-east-2.amazonaws.com/${file.name}`;
      });
    });

    try {
      const urls = await Promise.all(uploadPromises);
      console.log('Uploaded image URLs:', urls);
      setUploadedImageUrls(urls);
      dispatch(addMotorcyleImageThunk(urls));
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image. Please try again.');
    }
  };

  useEffect(() => {
    console.log('handleImageUpload useEffect');
    if (triggerUpload) {
      handleImageUpload();
    }
  }, [triggerUpload]);

  return (
    <div>
      {selectedFiles.map((file, index) => (
        <div key={index} style={{ display: 'flex' }}>
          <p>Photo {index + 1}: {file.name}</p>
          <button className="delete-photo-button" onClick={() => handleDeleteFile(index)}>
            Delete
          </button>
          {uploadedImageUrls[index] && (
            <p style={{ marginLeft: '10px' }}>Uploaded Image URL: {uploadedImageUrls[index]}</p>
          )}
        </div>
      ))}
      <input type="file" multiple onChange={handleFileChange} />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddPhoto;