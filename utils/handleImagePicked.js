import axios from "axios";

const handleImagePicked = async (
  image,
  userToken,
  userId,
  email,
  username,
  description
) => {
  try {
    // setUploading(true);
    // Pour isoler l'extension du fichier, afin de connaitre son type (jpg, png...)
    if (image) {
      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];

      // FormData() va nous servir à envoyer un fichier en body de la requête
      const formData = new FormData();

      // On ajoute à l'object formData une clé photo
      formData.append("photo", {
        image,
        name: `photo.${fileType}`,
        type: `image/${fileType}`, // la clé type doit être obligatoirement précisée en React Native
      });
      console.log(formData);
      // La requête pour envoyer l'image au serveur
      const uploadResponse = await axios.put(
        `https://express-airbnb-api.herokuapp.com/user/upload_picture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(uploadResponse);
    }
    const body = {
      email: email,
      username: username,
      description: description,
    };

    const response = await axios.put(
      `https://express-airbnb-api.herokuapp.com/user/update`,
      body,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    // console.log(uploadResponse.data.photo[0].url);
    return response.data;
    // if (
    //   Array.isArray(uploadResponse.data.photo) === true &&
    //   uploadResponse.data.photo.length > 0
    // ) {
    //   setImage(uploadResponse.data.photo[0].url);
    // }
  } catch (e) {
    console.log(e.response.data);
    // alert("Upload failed, sorry :(");
  }
};

export default handleImagePicked;
