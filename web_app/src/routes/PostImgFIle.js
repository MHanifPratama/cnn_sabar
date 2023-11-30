const PostImgFile = async (imageSrc) => {
    const blob = await fetch(imageSrc).then((res) => res.blob());
  
    const formData = new FormData();
    formData.append('image', blob, 'image.jpg');
  
    try {
      const requestOptions = {
        method: 'POST',
        body: formData,
      };
      const response = await fetch('http://127.0.0.1:8000/predict-image', requestOptions);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };
  
  export default PostImgFile;
  