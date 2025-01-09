import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/Header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <Header currentUser={currentUser} />
      <Component currentUser={currentUser} {...pageProps} />
    </>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  console.log(Object.keys(appContext)); // Logs the keys, including `ctx`

  // Stelle sicher, dass der client korrekt erstellt wird
  const client = buildClient(appContext.ctx);

  // Überprüfe, ob die `get` Methode vorhanden ist
  if (!client.get) {
    console.error('client.get is not a function');
    return { pageProps: {}, currentUser: null };
  }

  try {
    // Hole die aktuellen Benutzerdaten
    const { data } = await client.get('/api/users/currentuser');
    console.log('Current User Data:', data);

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(
        appContext.ctx,
        client,
        data.currentUser
      );
    }

    console.log('Page Props:', pageProps);
    return { pageProps, ...data };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { pageProps: {}, currentUser: null };
  }
};

export default AppComponent;
