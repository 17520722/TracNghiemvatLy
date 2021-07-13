import axios from 'axios'
const API_URL = "https://vatlythpt.herokuapp.com/uploads"

const cloudinaryUpload = async (fileToUpload) => {
     const uploadData = new FormData();
     uploadData.append("file", fileToUpload[0], "file");
     return await axios.post(API_URL + '/cloudinary-upload', uploadData)
     .then(res => res.data)
     .catch(err => console.log(err))
}

export default cloudinaryUpload;
