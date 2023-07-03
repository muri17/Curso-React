import axios from "axios";

const baseUrl = 'https://backend-recipes-bootcamps-tribe.onrender.com/api/auth'

export const login = (email, password) => axios({
  
    // Endpoint to send files
    url: `${baseUrl}/login`,
    method: "POST",
    headers: {

      // Add any auth token here
      'Content-Type': 'application/json'
    },

    // Attaching the form data
    data: {
      email,
      password
    }
  })

    // Handle the response from backend here
    .then((res) => { return res })

    // Catch errors if any
    .catch((err) => { return err });

export const signup = (email, password) => axios({

    // Endpoint to send files
    url: `${baseUrl}/signup`,
    method: "POST",
    headers: {

        // Add any auth token here
        'Content-Type': 'application/json'
    },

    // Attaching the form data
    data: {
        email,
        password
    }
    })

    // Handle the response from backend here
    .then((res) => { return res })

    // Catch errors if any
    .catch((err) => { return err });
    