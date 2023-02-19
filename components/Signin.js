import Header from "./Header";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { collectData, collectToken } from "../reducer/user";
import { setAnimation } from "../reducer/animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSearch,
  faBars,
  faXmark,
  faBookBookmark,
  faEye,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Sign.module.css";
import { text } from "@fortawesome/fontawesome-svg-core";
function Signin() {
  let styleIframe = {
    display: "block",
  };
  const router = useRouter();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.value.token);
  let allUserData;
  let descriptionPopUp = (
    <>
      <h2>Félicitation , vous êtes inscrits</h2>
      <h3>
        Voulez-vous connecter ? <span>Cliquez ici</span>
      </h3>
    </>
  );
  //regex only alphabet

  const [auth, setAuth] = useState(false);
  const [connected, setConnected] = useState(false);
  const [displayMessageGOB, setDisplayMessageGOB] = useState(false);
  let styleOpacity = {};
  let stylePopUp = {};

  const [messageData, setMessageData] = useState("");
  const [dataUser, setDataUser] = useState([]);

  const regexAlphabet = new RegExp(/^[a-zA-Z]+$/);
  const regexUser = new RegExp(/^[a-zA-Z0-9]+$/);
  const regexMail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // check if the form is valid

  const connect = () => {
    setAuth(false);
    if (username && password) {
      setConnected(true);

      setDisplayMessageGOB(false);
      fetch("https://backend-oussnews-twoo.vercel.app/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setConnected(true);

          if (data.result) {
            setDisplayMessageGOB(true);
            dispatch(collectToken(data.data));
            setAuth(true);

            setMessageData(data.message);
            setDataUser([data.data.username]);
            setTimeout(() => {
              router.push("/");
            }, 1000);
          } else {
            setMessageData(data.message);
          }
        });
    } else {
      setDisplayMessageGOB(false);
      styleIframe = {
        display: "none",
      };

      setConnected(true);

      setMessageData("Remplissez tous vos champs");
    }

    console.log(token);
  };

  if (connected) {
    stylePopUp = {
      opacity: 1,
      trasnform: "scale(1)",
      visibility: "visible",
      transition: "all .3s",
    };

    styleOpacity = {
      opacity: 1,

      visibility: "visible",
      transition: "all .3s",
    };
  }

  if (!displayMessageGOB) {
    descriptionPopUp = (
      <>
        <iframe
          style={styleIframe}
          className={styles.iframe}
          src="https://embed.lottiefiles.com/animation/98635"
        ></iframe>
        <h2>{messageData} </h2>
      </>
    );
  } else {
    descriptionPopUp = (
      <>
        <h2>
          {messageData} , {dataUser}{" "}
        </h2>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className={styles.container}>
        {/* <img src="./pngManWorking.png" alt="man working" /> */}
        <div className={styles.form}>
          <h1>Page de connexion</h1>
          <form method="POST">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Nom d'utilisateur"
            />

            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Mot de passe"
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                connect();
              }}
            >
              Se connecter
            </button>
          </form>
        </div>
        <div className={styles.opacityShadow} style={styleOpacity}></div>
        <div className={styles.popUpWelcome} style={stylePopUp}>
          {descriptionPopUp}

          <button
            onClick={() => {
              setConnected(false);
            }}
          >
            Quitter
          </button>
        </div>
      </div>
    </>
  );
}

export default Signin;
