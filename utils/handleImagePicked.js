import axios from "axios";

const handleImagePicked = async (
  image,
  userToken,
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
        uri: image,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
      // La requête pour envoyer l'image au serveur
      await axios.put(
        `https://express-airbnb-api.herokuapp.com/user/upload_picture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
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

    return response.status;
  } catch (e) {
    console.log(e.response.data);
    // alert("Upload failed, sorry :(");
  }
};

export default handleImagePicked;
