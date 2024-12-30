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
  console.log(Object.keys(appContext)); // Should log keys, including `ctx`

  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }
  console.log(pageProps);
  return { pageProps, ...data };
};

export default AppComponent;
