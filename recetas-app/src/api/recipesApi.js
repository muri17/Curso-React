import axios from "axios";

const baseUrl = 'https://backend-recipes-bootcamps-tribe-production.up.railway.app/api/recipes'
const token = JSON.parse(localStorage.getItem('idToken'));

export const getRecetas = () => axios({
  
    // Endpoint to send files
    url: `${baseUrl}/get?auth=${token}`,
    method: "GET",
    headers: {

      // Add any auth token here
      'Content-Type': 'application/json',
    }
  })

    // Handle the response from backend here
    .then((res) => { return res.data })

    // Catch errors if any
    .catch((err) => { return err });

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
  })

    // Handle the response from backend here
    .then((res) => { return res.data })

    // Catch errors if any
    .catch((err) => { return err });