import Header from "./Header";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
function Sign() {
  const router = useRouter();
  let descriptionPopUp = (
    <>
      <h2>Félicitation , vous êtes inscrits</h2>
      <h3>
        Voulez-vous connecter ?{" "}
        <span
          onClick={() => {
            router.push("/signin");
          }}
        >
          Cliquez ici
        </span>
      </h3>
    </>
  );
  //regex only alphabet

  const [subscribed, setSubscribed] = useState(false);
  const [displayMessageGOB, setDisplayMessageGOB] = useState(false);
  let styleOpacity = {};
  let stylePopUp = {};

  let checkUsername = false;
  let checkEmail = false;
  let checkPassword = false;
  let checkPassword2 = false;

  const [messageData, setMessageData] = useState("");
  let textParagraph = "";
  let textParagraphEmail = "";
  let textParagraphPassword = "";
  let textParagraphPassword2 = "";
  let styleTextUsername = {
    color: "red",
  };

  let styleTextEmail = {
    color: "red",
  };

  let stylePassword = {
    color: "red",
  };

  let stylePassword2 = {
    color: "red",
  };

  const regexAlphabet = new RegExp(/^[a-zA-Z]+$/);
  const regexUser = new RegExp(/^[a-zA-Z0-9]+$/);
  const regexMail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // check if the form is valid

  if (username.length < 5) {
    textParagraph = "Nom d'utilisateur trop court";

    checkUsername = false;
    styleTextUsername = {
      color: "red",
    };
  } else if (regexAlphabet.test(username)) {
    textParagraph = "Nom d'utilisateur valide";

    checkUsername = true;
    styleTextUsername = {
      color: "green",
    };
  } else {
    checkUsername = false;
    textParagraph = "Nom d'utilisateur invalide (caractères spéciaux)";
    styleTextUsername = {
      color: "red",
    };
  }

  if (!regexMail.test(email)) {
    textParagraphEmail = "Email invalide";

    checkEmail = false;

    styleTextEmail = {
      color: "red",
    };
  } else {
    textParagraphEmail = "Email valide";
    checkEmail = true;
    styleTextEmail = {
      color: "green",
    };
  }

  if (password.length < 6) {
    textParagraphPassword = "Mot de passe trop court";

    checkPassword = false;
    stylePassword = {
      color: "red",
    };
  } else {
    textParagraphPassword = "Mot de passe valide";
    checkPassword = true;
    stylePassword = {
      color: "green",
    };
  }

  if (password !== password2) {
    textParagraphPassword2 = "Mot de passe différent";
    checkPassword2 = false;
    stylePassword2 = {
      color: "red",
    };
  } else {
    textParagraphPassword2 = "Mot de passe identique";
    checkPassword2 = true;
    stylePassword2 = {
      color: "green",
    };
  }

  const subscribe = () => {
    if (checkUsername && checkEmail && checkPassword && checkPassword2) {
      fetch("https://backend-oussnews-twoo.vercel.app/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSubscribed(true);

          if (data.result) {
            setDisplayMessageGOB(true);
            setMessageData(data.message);
          } else {
            setDisplayMessageGOB(false);
            setMessageData(data.message);
          }
        });
    } else {
      setDisplayMessageGOB(false);

      setSubscribed(true);
    }
  };

  if (subscribed) {
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

  if (displayMessageGOB) {
    descriptionPopUp = (
      <>
        <h2>Félicitation , vous êtes inscrits</h2>
        <h3>
          Voulez-vous connecter ?{" "}
          <span
            onClick={() => {
              router.push("/signin");
            }}
          >
            Cliquez ici
          </span>
        </h3>
      </>
    );
  } else {
    descriptionPopUp = (
      <>
        <h2>Inscription échouée</h2>
        <h3>{messageData}</h3>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className={styles.container}>
        <img src="./pngManWorking.png" alt="man working" />
        <div className={styles.form}>
          <h1>Page d'inscrption</h1>
          <form method="POST">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              style={styleTextUsername}
              type="text"
              name="username"
              id="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Nom d'utilisateur"
            />
            <p style={styleTextUsername}> {textParagraph}</p>

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              style={styleTextEmail}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
            <p style={styleTextEmail}> {textParagraphEmail}</p>
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
            <p style={stylePassword}> {textParagraphPassword}</p>

            <label htmlFor="password2">Confirmer le mot de passe</label>
            <input
              type="password"
              name="password2"
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
              id="password2"
              placeholder="Confirmer le mot de passe"
            />

            <p style={stylePassword2}> {textParagraphPassword2}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                subscribe();
              }}
            >
              S'inscrire
            </button>
          </form>
        </div>
        <div className={styles.opacityShadow} style={styleOpacity}></div>
        <div className={styles.popUpWelcome} style={stylePopUp}>
          {descriptionPopUp}

          <button
            onClick={() => {
              setSubscribed(false);
            }}
          >
            Quitter
          </button>
        </div>
      </div>
    </>
  );
}

export default Sign;
