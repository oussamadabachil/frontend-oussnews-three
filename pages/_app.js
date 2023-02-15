import "../styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { configureStore , combineReducers } from "@reduxjs/toolkit";
import { animationSlice } from "../reducer/animation";
import { userSlice } from "../reducer/user";
import user from "../reducer/user";
import animation from '../reducer/animation'


const store = configureStore({
  reducer: {animation ,user},
});




function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>OUSSNEWS</title>
        </Head>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default App;
