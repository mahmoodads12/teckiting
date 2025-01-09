import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // Auf dem Server (bei DigitalOcean)
    console.log(
      'Server Cookies:',
      req.headers.cookie || 'Keine Cookies gefunden'
    );

    // Stelle sicher, dass die Basis-URL für die Produktionsumgebung korrekt ist
    const baseURL =
      process.env.BASE_URL || 'http://www.ticketing-mma-de.store/';

    // Erstelle die Axios-Instanz mit den Headern und Cookies vom Server
    const client = axios.create({
      baseURL,
      headers: {
        ...req.headers, // Alle Header, einschließlich Cookies
      },
      withCredentials: true, // Cookies mit den Anfragen senden
    });

    // Füge einen Interceptor für die Antwort hinzu, um Fehler zu handhaben
    client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('Axios Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );

    return client;
  } else {
    // Im Browser
    console.log(
      'Client (Browser) Cookies:',
      document.cookie || 'Keine Cookies gefunden'
    );

    // Stelle sicher, dass die Basis-URL korrekt für den Browser ist
    return axios.create({
      baseURL: '/', // Relativer Pfad für den Browser
      withCredentials: true, // Cookies mit den Anfragen senden
    });
  }
};

export default buildClient;
