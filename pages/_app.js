import Container from "../components/Container/index";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default MyApp;
