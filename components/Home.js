import styles from "../styles/Home.module.css";
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
import { icon } from "@fortawesome/fontawesome-svg-core";

function Home() {
  let extraIconNotConnected = <ul></ul>;
  const [connectedUser, setConnectedUser] = useState(false);
  const token = useSelector((state) => state.user.value.token);

  let styleIframe, styleAuth;

  const [appearPopUp, setAppearPopup] = useState(false);

  const [appearApi, setAppearApi] = useState(false);

  const router = useRouter();

  let newArticless;

  let styleChangeOpacity;

  let connectedText = <p></p>;
  let popUpShlouldBeConnected = (
    <>
      <div className={styles.popUpAuth} style={styleAuth}></div>
    </>
  );

  const [realPopUpEye, setrealPopUpEye] = useState(false);
  const [realPopUpShare, setrealPopUpShare] = useState(false);
  const [realPopUpBookmark, setrealPopUpBookmark] = useState(false);

  const [newArticles, setNewArticle] = useState([]);
  const dispatch = useDispatch();

  const animation = useSelector((state) => state.animation.value);

  console.log(animation);
  const themes = ["actualité", "jeux", "technologie", "sport", "lifestyle"];

  var itemList = <p></p>;
  //afficher tous les themes
  itemList = themes.map((theme) => {
    return <button>{theme}</button>;
  });

  useEffect(() => {
    fetch("https://backend-oussnews-twoo.vercel.app/index/articles")
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          setAppearApi(true);
          console.log(data.articles);
          setNewArticle(data.articles);
        }
      });
  }, []);

  const appearRealPopUp = (e) => {
    const dataTitle = e.target.getAttribute("data-title");
    const dataInfo = e.target.getAttribute("data-info");
    console.log(dataInfo,dataTitle,"sssss")
  };
  if (appearApi) {
    styleIframe = {
      display: "none",
    };
  }

  let pShouldBeConnected;

  useEffect(() => {
    if (token == null) {
      setConnectedUser(false);
    } else {
      setConnectedUser(true);
    }
  }, []);

  if (!connectedUser) {
    pShouldBeConnected = (
      <p className={styles.textShloudConnected}>
        Connectez - vous pour avoir accés aux informations !{" "}
      </p>
    );
  } else {
    extraIconNotConnected = <></>;

    connectedText = (
      <>
        <p className={styles.connectedText}>
          Connecté en tant que {token.username}
        </p>
      </>
    );
  }

  if (appearPopUp) {
    styleAuth = {
      visibility: "visible",
      opacity: 1,
      transition: "all .3s",
    };
  } else {
    styleAuth = {
      visibility: "hidden",
      opacity: 0,
      transition: "all .3s",
    };
  }

  newArticless = newArticles.map((article) => {
    if (connectedUser) {
      styleChangeOpacity = {
        display: "none",
      };
      return (
        <div className={styles.card}>
          <div className={styles.imgBox}>
            <div className={styles.imgBoxOverlay}></div>
            <img src={article.urlToImage} />
            <h3>{article.title}</h3>
          </div>
          <div className={styles.content}>
            <p>{article.description}</p>
          </div>
          <ul className={styles.extraicons}>
            <li
              data-info="1"
              data-title={article.title}
              data-urlToImage={article.urlToImage}
              data-url={article.url}
              data-author={article.author}
              onClick={(e) => {
                appearRealPopUp(e);
              }}
            >
              <FontAwesomeIcon icon={faEye} />
            </li>
            <li
              data-info="2"
              onClick={(e) => {
                appearRealPopUp(e);
              }}
            >
              {" "}
              <FontAwesomeIcon icon={faShare} />
            </li>
            <li
              data-info="3"
              onClick={(e) => {
                appearRealPopUp(e);
              }}
            >
              {" "}
              <FontAwesomeIcon icon={faBookBookmark} />
            </li>
          </ul>
        </div>
      );
    } else {
      styleChangeOpacity = {
        display: "block",
      };
      return (
        <div className={styles.card}>
          <div className={styles.imgBox}>
            <div className={styles.imgBoxOverlay}></div>
            <img src="lockedWallpaper.jpg" />
            <h3>Titre vérouillée</h3>
          </div>
          <div className={styles.content}>
            <p>Description verouillée</p>
          </div>
        </div>
      );
    }
  });

  return (
    <>
      <Header />
      <div className={styles.container}>
        {connectedText}
        <div className={styles.main}>
          <h1>L'info pour vous !</h1>
          <div className={styles.themeDiv}>
            <h2>T'aime quel thème ?</h2>
            {itemList}
          </div>
          <h1>Nos dernières actus</h1>
          <iframe
            style={styleIframe}
            className={styles.iframe}
            src="https://embed.lottiefiles.com/animation/98635"
          ></iframe>
          {pShouldBeConnected}

          <div className={styles.flexContainer}>
            {newArticless}
            <div
              className={styles.opacityContainerArticles}
              style={styleChangeOpacity}
            ></div>
          </div>
        </div>
      </div>

      <div className={styles.popUpAuth} style={styleAuth}>
        <h2>Vous devez d'abord être connecté</h2>
        <h3>
          Pour vous connectez ,{" "}
          <span
            onClick={() => {
              router.push("/signin");
            }}
          >
            Cliquez ici
          </span>
        </h3>
        <h3>
          Pour vous inscrire ,{" "}
          <span
            onClick={() => {
              router.push("/signup");
            }}
          >
            Cliquez ici
          </span>
        </h3>

        <button
          onClick={() => {
            setAppearPopup(false);
          }}
        >
          Quitter
        </button>
      </div>
      <div className={styles.opacityShadow} style={styleAuth}></div>
    </>
  );
}

export default Home;
