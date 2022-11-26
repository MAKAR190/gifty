import { useState, useEffect } from "react";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { PortableTextComponentsProvider } from "@portabletext/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router, { useRouter } from "next/router";
import portableTextOptions from "../utils/portableTextOptions";
import { Loader } from "../components";
import StateContext from "../context/StateContext";
import Head from "next/head";
import Aos from "aos";
import "aos/dist/aos.css";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../components/Header/Header"), {
  ssr: false,
});
const Footer = dynamic(() => import("../components/Footer/Footer"), {
  ssr: false,
});
const emptyPages = [
  "/payment/canceled",
  "/payment/success",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password/[token]",
];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    Aos.init({
      offset: 200,
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
      delay: 100,
      disable: typeof window !== "undefined" && window.innerWidth < 768,
    });
  }, []);
  Router.onRouteChangeStart = () => {
    setLoader(true);
  };
  Router.onRouteChangeComplete = () => {
    setLoader(false);
  };
  return (
    <Provider store={store}>
      {emptyPages.some((el) => el.includes(router.pathname)) &&
      router.pathname.length > 1 ? (
        <StateContext>
          <ThemeProvider theme={theme}>
            <PortableTextComponentsProvider components={portableTextOptions}>
              <Head>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
              </Head>
              <Component {...pageProps} />
              {loader && <Loader />}
              <ToastContainer />
            </PortableTextComponentsProvider>
          </ThemeProvider>
        </StateContext>
      ) : (
        <StateContext>
          <ThemeProvider theme={theme}>
            <PortableTextComponentsProvider components={portableTextOptions}>
              <Head>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
              </Head>
              <Component {...pageProps} />
              <Header />
              {loader && <Loader />}
              <ToastContainer />
              <Footer />
            </PortableTextComponentsProvider>
          </ThemeProvider>
        </StateContext>
      )}
    </Provider>
  );
}

export default MyApp;
