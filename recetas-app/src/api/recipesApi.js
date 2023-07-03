import axios from "axios";
import AxiosInstance from "../api/interceptor";

const baseUrl = 'https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes'
const token = await JSON.parse(localStorage.getItem('idToken'));

export const getRecetas = async () => {
  return AxiosInstance
    .get(`/get?auth=${JSON.parse(localStorage.getItem('idToken'))}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error
    });
};

// export const getRecetas = () => axios({
  
//     // Endpoint to send files
//     url: `${baseUrl}/get?auth=${JSON.parse(localStorage.getItem('idToken'))}`,
//     method: "GET",
//     headers: {

//       // Add any auth token here
//       'Content-Type': 'application/json',
//     }
//   })

//     // Handle the response from backend here
//     .then((res) => { return res.data })

//     // Catch errors if any
//     .catch((err) => { return err });

export const agregarReceta = (name, description, ingredients, imagePath) => axios({
  
    // Endpoint to send files
    url: `${baseUrl}/add?auth=${token}`,
    method: "POST",
    headers: {

      // Add any auth token here
      'Content-Type': 'application/json',
    },

    // Attaching the form data
    data: {
        name,
        description,
        ingredients, 
        imagePath
    }
  }).then((res) => { return res.data }).catch((err) => { return err });

  
export const eliminarReceta = (id) => axios({

  // Endpoint to send files
  url: `${baseUrl}/delete/${id}?auth=${token}`,
  method: "DELETE",
  headers: {

    // Add any auth token here
    'Content-Type': 'application/json',
  }
}).then((res) => { return res.data }).catch((err) => { return err });

export const editarReceta = (name, description, ingredients, imagePath, id, userEmail, __v ) => axios({
  
  // Endpoint to send files
  url: `${baseUrl}/edit/${id}?auth=${token}`,
  method: "PUT",
  headers: {

    // Add any auth token here
    'Content-Type': 'application/json',
  },

  // Attaching the form data
  data: {
      name,
      description,
      ingredients, 
      imagePath,
      userEmail,
      __v
  }
}).then((res) => { return res.data }).catch((err) => { return err });

