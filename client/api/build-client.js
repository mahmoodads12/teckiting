import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // Auf dem Server
    console.log(
      'Server Cookies:',
      req.headers.cookie || 'Keine Cookies gefunden'
    );
    return axios.create({
      baseURL: 'http://www.ticketing-mma-de.store/',
      headers: {
        ...req.headers, // Alle Header weitergeben, einschließlich Cookies
      },
      withCredentials: true,
    });
  } else {
    // Im Browser
    return axios.create({
      baseURL: '/',
      withCredentials: true,
    });
  }
};

export default buildClient;
